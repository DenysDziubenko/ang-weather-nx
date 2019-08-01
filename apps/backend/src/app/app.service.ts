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

@Injectable()
export class AppService {

  // TODO save, retrieve subscriptions in DB
  private userSubscriptions: UserSubscriptions[] = [];
  private subscriptions: Subscription[] = [];
  private notificationPayload = {
    notification: {
      title: 'Weather News',
      body: 'Weather Precipitations',
      icon: 'assets/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        city: {},
        day : ''
      },
      actions: [{
        action: 'explore',
        title: 'Go to the site'
      }]
    }
  };

  constructor(private hs: HttpService) {
    webPush.setVapidDetails('mailto:example@yourdomain.org', ConfigData.VAPID_PUBLIC_KEY, ConfigData.VAPID_PRIVATE_KEY);
    if (this.userSubscriptions.length) {
      this.setWeatherPolling();
    }
  }

  private setWeatherPolling() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

    this.userSubscriptions.forEach(userSub => {
      userSub.subscriptions.forEach(sub => {
        this.subscriptions.push(interval(15000)
          .pipe(switchMap(() => this.get5DayForecastByCityId(sub.city.id)))
          .subscribe(weather => {
            const forecastPeriod = this.searchPrecipitations(weather);
            if (forecastPeriod) {
              this.sendNotifications(weather.city, forecastPeriod, sub.pushSubscription);
            }
          }));
      });
    });
  }

  private searchPrecipitations =
    (weather: FiveDayWeather) =>
      weather.list.find(period => !!(period.snow && period.snow['3h'] || period.rain && period.rain['3h']));

  private sendNotifications(city: City, forecastPeriod: ForecastPeriod, pushSubscription) {
    const day = getWeekDay(forecastPeriod.dt);
    this.notificationPayload.notification.body = `Found weather precipitations in ${city.name} at ${day}`;
    this.notificationPayload.notification.data.city = city;
    this.notificationPayload.notification.data.day = day;

    webPush.sendNotification(pushSubscription, JSON.stringify(this.notificationPayload))
      .then(() => console.log(`Push Notification was sent for ${city.name}`))
      .catch(err => console.error('Error sending push notification, reason: ', err));
    // TODO handle web push errors
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
    return userSub ? userSub : {userId, subscriptions: []};
  }

  addSubscription(userSubscription: UserSubscriptions): UserSubscriptions {
    const userSub = this.findUserSubscription(userSubscription.userId);

    if (userSub) {
      userSub.subscriptions.push(userSubscription.subscriptions[0]);
    } else {
      this.userSubscriptions.push(userSubscription);
    }
    this.setWeatherPolling();
    return this.findUserSubscription(userSubscription.userId);
  }

  deleteSubscription(userId: number, cityId: number): UserSubscriptions {
    const userSub = this.findUserSubscription(userId);

    if (userSub) {
      userSub.subscriptions = userSub.subscriptions.filter(sub => sub.city.id !== cityId);
    }
    this.setWeatherPolling();

    return userSub;
  }
}
