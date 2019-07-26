import { Pipe, PipeTransform } from '@angular/core';
import { DaysMap } from '../models/weather.models';
import { ForecastPeriod } from '@ang-weather-nx/shared-data';

@Pipe({
  name: 'periodFilter'
})
export class PeriodFilterPipe implements PipeTransform {
  private daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  transform(periods: ForecastPeriod[]): DaysMap {
    const days: DaysMap = new Map();
    periods.forEach((period, i) => {
      const weekDay = this.getWeekDay(new Date(period.dt * 1000));

      if (days.has(weekDay)) {
        days.get(weekDay).periods.push(period);
      } else {
        days.set(weekDay, { selected: i === 0, periods: [period] });
      }
    });

    return days;
  }

  getWeekDay(date) {
    return this.daysArr[date.getDay()];
  }

}
