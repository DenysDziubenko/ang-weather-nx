import { Component, OnDestroy, OnInit } from '@angular/core';
import { getTextWindDirection } from '../../helpers/function-helpers';
import { CurrentWeather } from '../../models/weather.models';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../reducers/app.reducers';
import {
  selectCurrentWeather,
  selectSelectedCityAndAllSubscriptions
} from '../../app.selectors';
import { selectedTrigger } from '../../helpers/animations';
import { SwPush } from '@angular/service-worker';
import { City, ConfigData, UserSubscriptions } from '@ang-weather-nx/shared-data';
import {
  GotAnErrorDuringRequest,
  NewUserSubscriptionRequested,
  RemoveUserSubscriptionRequested
} from '../../actions/app.actions';

@Component({
  selector: 'app-current-weather-table',
  templateUrl: './current-weather-table.component.html',
  styleUrls: ['./current-weather-table.component.scss'],
  animations: [selectedTrigger]
})
export class CurrentWeatherTableComponent implements OnInit, OnDestroy {
  isSubscribed = false;
  currentWeather$: Observable<CurrentWeather>;
  subs: Subscription[] = [];

  constructor(private store: Store<State>, private swPush: SwPush) {
  }

  ngOnInit() {
    this.currentWeather$ = this.store.pipe(select(selectCurrentWeather));
    this.subs.push(this.store.pipe(select(selectSelectedCityAndAllSubscriptions))
      .subscribe((data) => {
        const selectedCity: City = data[0];
        const userSubscriptions: UserSubscriptions = data[1];
        if (userSubscriptions && userSubscriptions.subscriptions) {
          this.isSubscribed = userSubscriptions.subscriptions.some(sub => sub.city.id === selectedCity.id);
        }
      }));
    this.swPush.messages.subscribe(messages => {
      console.log(messages);
    });
  }

  getTextWindDirection(deg: number) {
    return getTextWindDirection(deg);
  }

  subscribeToNotifications() {
    if (this.isSubscribed) {
      this.store.dispatch(new RemoveUserSubscriptionRequested());
    } else {
      this.swPush.requestSubscription({ serverPublicKey: ConfigData.VAPID_PUBLIC_KEY })
        .then((subscription: PushSubscription) => this.store.dispatch(new NewUserSubscriptionRequested({ subscription })))
        .catch(error => this.store.dispatch(new GotAnErrorDuringRequest({ error })));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
