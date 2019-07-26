import { Component, OnInit } from '@angular/core';
import { getTextWindDirection } from '../../helpers/function-helpers';
import { CurrentWeather } from '../../models/weather.models';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../reducers/app.reducers';
import { selectCurrentWeather } from '../../app.selectors';
import { selectedTrigger } from '../../helpers/animations';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-current-weather-table',
  templateUrl: './current-weather-table.component.html',
  styleUrls: ['./current-weather-table.component.scss'],
  animations: [selectedTrigger]
})
export class CurrentWeatherTableComponent implements OnInit {
  isSubscribed = false;

  currentWeather$: Observable<CurrentWeather>;

  constructor(
    private store: Store<State>,
    private swPush: SwPush) {
  }

  ngOnInit() {
    this.currentWeather$ = this.store.pipe(select(selectCurrentWeather));
  }

  getTextWindDirection(deg: number) {
    return getTextWindDirection(deg);
  }

  subscribeToNotifications() {

    // TODO
    // this.swPush.requestSubscription({
    //   serverPublicKey: this.VAPID_PUBLIC_KEY
    // })
    //   .then(sub => this.service.addPushSubscriber(sub).subscribe())
    //   .catch(err => console.error("Could not subscribe to notifications", err));

  }

}
