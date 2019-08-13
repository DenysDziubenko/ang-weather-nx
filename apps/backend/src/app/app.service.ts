import { HttpService, Injectable } from '@nestjs/common';
import { interval, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  City,
  ConfigData,
  FiveDayWeather,
  ForecastPeriod,
  getWeekDay,
  UserSubscriptions
} from '@ang-weather-nx/shared-data';
import * as webPush from 'web-push';
import * as admin from 'firebase-admin';
import { ConfigService } from './app.config-service';

@Injectable()
export class AppService {
  private db: admin.firestore.Firestore;
  private userSubRefs;
  private userSubscriptions: UserSubscriptions[] = [];
  private pollSubscriptions: Subscription[] = [];
  // private period = 3 * 60 * 60 * 1000; // every 3 hour
  private period = 30 * 60 * 1000; // every 30 minute
  private notificationPayload = {
    notification: {
      title: 'Weather News',
      body: 'Weather Precipitations',
      icon: 'assets/icons/icon-72x72.png',
      tag: '',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        city: {},
        day: ''
      },
      actions: [{
        action: 'explore',
        title: 'Go to the site'
      }]
    }
  };

  constructor(
    private hs: HttpService,
    config: ConfigService) {
    webPush.setVapidDetails('mailto:example@yourdomain.org', ConfigData.VAPID_PUBLIC_KEY, config.get('VAPID_PRIVATE_KEY'));
    admin.initializeApp({ credential: admin.credential.cert({
        projectId: "weather-app-6e386",
        privateKey: config.get('PRIVATE_KEY').replace(/\\n/g, '\n'),
        clientEmail: config.get('CLIENT_EMAIL')
      }) });
    this.db = admin.firestore();
    this.userSubRefs = this.db.collection('userSubscriptions');
    this.userSubRefs.get().then(snapshot => {
      snapshot.forEach(doc => this.userSubscriptions.push(
        {
          userId: parseInt(doc.id, 10),
          subscriptions: doc.data().subscriptions
        }));
      if (this.userSubscriptions.length) {
        this.setWeatherPolling();
      }

    }).catch((err) => {
      console.log('Error getting users subscriptions - ', err);
    });
  }

  private setWeatherPolling() {
    this.pollSubscriptions.forEach(sub => sub.unsubscribe());
    const allSubscriptions = this.userSubscriptions.reduce((arr, userSub) => [...arr, ...userSub.subscriptions], []);

    if (allSubscriptions.length) {
      allSubscriptions.forEach(sub => {
        this.pollSubscriptions.push(interval(this.period)
          .pipe(switchMap(() => this.get5DayForecastByCityId(sub.city.id)))
          .subscribe(weather => {
            const d = new Date();
            const cityName = weather.city.name;
            console.log(`Got a weather at time - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} for city - ${cityName}`);
            const forecastPeriod = this.searchPrecipitations(weather);
            if (forecastPeriod) {
              this.sendNotifications(weather.city, forecastPeriod, sub.pushSubscription);
            }
          }));
      });
    }
  }

  private searchPrecipitations =
    (weather: FiveDayWeather) =>
      weather.list.find(period => !!(period.snow && period.snow['3h'] || period.rain && period.rain['3h']));

  private sendNotifications(city: City, forecastPeriod: ForecastPeriod, pushSubscription) {
    const day = getWeekDay(forecastPeriod.dt);
    this.notificationPayload.notification.tag = day;
    this.notificationPayload.notification.body = `Found weather precipitations in ${city.name} at ${day}`;
    this.notificationPayload.notification.data.city = city;
    this.notificationPayload.notification.data.day = day;

    webPush.sendNotification(pushSubscription, JSON.stringify(this.notificationPayload))
      .then(() => console.log(`Push Notification was sent, city - ${city.name}, day - ${day}, time period - ${forecastPeriod.dt}`))
      .catch(err => console.error('Error sending push notification, reason: ', err));
  }

  private get5DayForecastByCityId(id: number): Observable<FiveDayWeather> {
    const url = `${ConfigData.OPENWEATHERMAP_URL}forecast?id=${id}&appid=${ConfigData.OPENWEATHERMAP_APPID}&units=metric`;
    return this.hs.get<FiveDayWeather>(url).pipe(map(response => response.data));
  }

  private findUserSubscription(userId: number) {
    return this.userSubscriptions.find(userSub => userSub.userId === userId);
  }

  getSubscriptions(userId: number): UserSubscriptions {
    const userSub = this.findUserSubscription(userId);
    return userSub ? userSub : { userId, subscriptions: [] };
  }

  addSubscription(userSubscription: UserSubscriptions): UserSubscriptions {
    const userSub = this.findUserSubscription(userSubscription.userId);

    if (userSub) {
      userSub.subscriptions.push(userSubscription.subscriptions[0]);
    } else {
      this.userSubscriptions.push(userSubscription);
    }

    const updatedUserSub = this.findUserSubscription(userSubscription.userId);
    this.userSubRefs.doc(`${userSubscription.userId}`).set({ subscriptions: updatedUserSub.subscriptions });
    this.setWeatherPolling();
    return updatedUserSub;
  }

  deleteSubscription(userId: number, cityId: number): UserSubscriptions {
    const userSub = this.findUserSubscription(userId);

    if (userSub) {
      userSub.subscriptions = userSub.subscriptions.filter(sub => sub.city.id !== cityId);
      this.userSubRefs.doc(`${userSub.userId}`).set({ subscriptions: userSub.subscriptions });
      this.setWeatherPolling();
    }

    return userSub;
  }
}
