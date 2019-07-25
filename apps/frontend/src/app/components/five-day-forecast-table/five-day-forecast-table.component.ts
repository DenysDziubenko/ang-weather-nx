import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ForecastPeriod} from '../../models/weather.models';
import {capitalizeFirstLetter, getTextWindDirection} from '../../helpers/function-helpers';
import {slideTrigger} from '../../helpers/animations';

@Component({
  selector: 'app-five-day-forecast-table',
  templateUrl: './five-day-forecast-table.component.html',
  styleUrls: ['./five-day-forecast-table.component.scss'],
  animations: [slideTrigger]
})
export class FiveDayForecastTableComponent implements OnInit {

  @Input() periods: ForecastPeriod[];
  @Input() isTableValueChanged: boolean;
  isSmallMode;

  constructor() {
    this.getScreenSize();
  }

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.isSmallMode = window.innerWidth <= 700;
  }

  capitalizeFirstLetter(str) {
    return capitalizeFirstLetter(str);
  }

  getTextWindDirection(deg: number) {
    return getTextWindDirection(deg);
  }

}
