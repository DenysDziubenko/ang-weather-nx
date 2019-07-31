import { Pipe, PipeTransform } from '@angular/core';
import { DaysMap } from '../models/weather.models';
import { ForecastPeriod, getWeekDay } from '@ang-weather-nx/shared-data';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'periodFilter'
})
export class PeriodFilterPipe implements PipeTransform {

  constructor(private route: ActivatedRoute) {
  }

  transform(periods: ForecastPeriod[]): DaysMap {
    const day = this.route.snapshot.queryParams['day'];
    const days: DaysMap = new Map();
    periods.forEach((period, i) => {
      const weekDay = getWeekDay(period.dt);

      if (days.has(weekDay)) {
        days.get(weekDay).periods.push(period);
      } else {
        const selected = day ? weekDay === day.trim() : i === 0;
        days.set(weekDay, { selected, periods: [period] });
      }
    });
    return days;
  }
}
