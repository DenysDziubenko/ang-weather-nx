import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {DaysKeyValue, DayValue, FiveDayWeather} from '../../models/weather.models';
import {selectedTrigger, showTrigger} from '../../helpers/animations';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers/app.reducers';
import {FiveDayWeatherRequested} from '../../actions/app.actions';
import {selectFiveDayWeather, selectSelectedCity} from '../../app.selectors';

@Component({
  selector: 'app-five-day-forecast',
  templateUrl: './five-day-forecast.component.html',
  styleUrls: ['./five-day-forecast.component.scss'],
  animations: [selectedTrigger, showTrigger]
})
export class FiveDayForecastComponent implements OnInit, OnDestroy {
  sub: Subscription;
  @ViewChild('table', {static: false}) table;
  isTableValueChanged = false;
  fiveDayWeather$: Observable<FiveDayWeather>;

  constructor(
    private router: Router,
    private store: Store<State>) {
  }

  ngOnInit() {
    this.sub = this.store.pipe(select(selectSelectedCity)).subscribe(city => {
      if (city) {
        this.store.dispatch(new FiveDayWeatherRequested());
      } else {
        this.router.navigateByUrl('');
      }
    });

    this.fiveDayWeather$ = this.store.pipe(select(selectFiveDayWeather));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updatesTable(dayValue: DayValue, days: Array<DaysKeyValue>) {
    if (dayValue.selected) {
      return;
    }

    days.forEach(day => day.value.selected = false);
    this.table.periods = dayValue.periods;
    dayValue.selected = true;
    this.isTableValueChanged = true;
    setTimeout(() => {
      this.isTableValueChanged = false;
    }, 500);

  }

  keyDescOrder = (a: DaysKeyValue, b: DaysKeyValue): number => {
    return a.value.periods[0].dt - b.value.periods[0].dt;
  }
}
