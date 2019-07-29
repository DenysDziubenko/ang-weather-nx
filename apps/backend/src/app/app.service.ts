import { HttpService, Injectable } from '@nestjs/common';
import { interval, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigData, FiveDayWeather, UserSubscriptions } from '@ang-weather-nx/shared-data';
import * as webPush from 'web-push';

@Injectable()
export class AppService {

  private userSubscriptions: UserSubscriptions[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private hs: HttpService) {
    webPush.setVapidDetails('mailto:example@yourdomain.org', ConfigData.VAPID_PUBLIC_KEY, ConfigData.VAPID_PRIVAT_KEY);
    if (this.userSubscriptions.length) {
      this.setWeatherPolling();
    }
  }

  getData(): { message: string } {
    // TODO update to return index.html
    return ({ message: 'Welcome to backend!' });
  }

  private setWeatherPolling() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.userSubscriptions.forEach(userSub => {
      userSub.subscriptions.forEach(sub => {
        this.subscriptions.push(interval(10000)
          .pipe(switchMap(() => this.get5DayForecastByCityId(sub.city.id)))
          .subscribe(weather => {
            // TODO search any precipitations in weather.list and send notifications
            this.sendNotifications();
          }));
      });
    });
  }

  private sendNotifications() {
    const notificationPayload = {
      'notification': {
        'title': 'Weather News',
        'body': 'Weather Precipitations',
        'icon': 'assets/icons/icon-72x72.png',
        'vibrate': [100, 50, 100],
        'data': {
          'dateOfArrival': Date.now(),
          'primaryKey': 1
        },
        'actions': [{
          'action': 'explore',
          'title': 'Go to the site'
        }]
      }
    };

    if (this.userSubscriptions.length) {
      this.userSubscriptions.forEach(userSub => {
        userSub.subscriptions.forEach(sub => {
          webPush.sendNotification(<any>sub.pushSubscription, JSON.stringify(notificationPayload))
            .then(() => console.log('notification was sent'))
            .catch(err => console.error('Error sending notification, reason: ', err));
        });
      });
    }
  }

  private get5DayForecastByCityId(id: number): Observable<FiveDayWeather> {
    const url = `${ConfigData.OPENWEATHERMAP_URL}forecast?id=${id}&appid=${ConfigData.OPENWEATHERMAP_APPID}&units=metric`;
    return this.hs.get<FiveDayWeather>(url).pipe(map(response => response.data[0]));
  }

  getSubscriptions(id: number) {
    return this.userSubscriptions.filter(userSub => userSub.userId === id);
  }

  addPushSubscriber(userSubscriptions: UserSubscriptions) {
    this.userSubscriptions.push(userSubscriptions);
    this.setWeatherPolling();
  }

  deleteSubscription(userId: number, cityId: number) {
    this.userSubscriptions.forEach(userSub => {
      if (userSub.userId === userId) {
        userSub.subscriptions = userSub.subscriptions.filter(sub => sub.city.id !== cityId);
      }
    });
  }
}
