import { HttpService, Injectable } from '@nestjs/common';
import { interval, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { City, ConfigData, FiveDayWeather, ForecastPeriod, UserSubscriptions } from '@ang-weather-nx/shared-data';
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
        forecastPeriod : {}
      },
      actions: [{
        action: 'explore',
        title: 'Go to the site'
      }]
    }
  };

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

    this.notificationPayload.notification.body =
      `Found weather precipitations in ${city.name} for period ${new Date(forecastPeriod.dt * 1000)}`;
    this.notificationPayload.notification.data.city = city;
    this.notificationPayload.notification.data.forecastPeriod = forecastPeriod;

    webPush.sendNotification(pushSubscription, JSON.stringify(this.notificationPayload))
      .then(() => console.log(`Push Notification was sent for ${city.name}`))
      .catch(err => console.error('Error sending push notification, reason: ', err));
  }

  private get5DayForecastByCityId(id: number): Observable<FiveDayWeather> {
    const url = `${ConfigData.OPENWEATHERMAP_URL}forecast?id=${id}&appid=${ConfigData.OPENWEATHERMAP_APPID}&units=metric`;
    return this.hs.get<FiveDayWeather>(url).pipe(map(response => response.data));
  }

  private findUserSubscription(userId: number) {
    return this.userSubscriptions.find(userSub => userSub.userId === userId);
  }

  getSubscriptions(userId: number) {
    const userSub = this.findUserSubscription(userId);
    return userSub ? userSub.subscriptions : [];
  }

  addSubscription(userSubscription: UserSubscriptions) {
    const userSub = this.findUserSubscription(userSubscription.userId);

    if (userSub) {
      userSub.subscriptions.push(userSubscription.subscriptions[0]);
    } else {
      this.userSubscriptions.push(userSubscription);
    }
    this.setWeatherPolling();
    return this.userSubscriptions;
  }

  deleteSubscription(userId: number, cityId: number) {
    const userSub = this.findUserSubscription(userId);

    if (userSub) {
      userSub.subscriptions = userSub.subscriptions.filter(sub => sub.city.id !== cityId);
    }
    this.setWeatherPolling();

    return this.userSubscriptions;
  }
}
