import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FiveDayForecastComponent} from './components/five-day-forecast/five-day-forecast.component';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';

const routes: Routes = [
  {path: '', redirectTo: '/currentWeather', pathMatch: 'full'},
  {path: 'currentWeather', component: CurrentWeatherComponent},
  {path: 'fiveDayForecast', component: FiveDayForecastComponent},
  {path: '**', redirectTo: '/currentWeather'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
