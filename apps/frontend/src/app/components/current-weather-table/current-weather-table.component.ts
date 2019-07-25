import {Component, OnInit} from '@angular/core';
import {getTextWindDirection} from '../../helpers/function-helpers';
import {CurrentWeather} from '../../models/weather.models';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers/app.reducers';
import {selectCurrentWeather} from '../../app.selectors';

@Component({
  selector: 'app-current-weather-table',
  templateUrl: './current-weather-table.component.html',
  styleUrls: ['./current-weather-table.component.scss']
})
export class CurrentWeatherTableComponent implements OnInit {

  currentWeather$: Observable<CurrentWeather>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.currentWeather$ = this.store.pipe(select(selectCurrentWeather));
  }

  getTextWindDirection(deg: number) {
    return getTextWindDirection(deg);
  }

}
