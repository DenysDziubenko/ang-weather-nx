import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CurrentWeatherTableComponent} from './components/current-weather-table/current-weather-table.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {RequestInterceptor} from './services/request-interceptor';
import {FiveDayForecastComponent} from './components/five-day-forecast/five-day-forecast.component';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {PeriodFilterPipe} from './pipes/period-filter.pipe';
import {FiveDayForecastTableComponent} from './components/five-day-forecast-table/five-day-forecast-table.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollToCenterDirective} from './directives/scroll-to-center.directive';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers/app.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from './helpers/utils';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherTableComponent,
    SpinnerComponent,
    FiveDayForecastComponent,
    CurrentWeatherComponent,
    PeriodFilterPipe,
    FiveDayForecastTableComponent,
    ScrollToCenterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'})
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
