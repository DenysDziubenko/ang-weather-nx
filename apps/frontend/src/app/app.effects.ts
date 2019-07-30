import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AllCountries,
  AllCountriesRequested,
  Cities,
  CitiesByCountryRequested,
  CityNames,
  SearchCitiesRequested,
  SelectCity,
  AppActionTypes,
  CurrentWeatherRequested,
  CurrentWeatherForecast,
  FiveDayWeatherForecast,
  FiveDayWeatherRequested,
  GotAnErrorDuringRequest,
  CitiesWeatherWithinRectangleZoneRequested,
  CitiesWeatherWithinRectangleZone,
  AllSubscriptions,
  AllSubscriptionsRequested,
  NewUserSubscription,
  RemoveUserSubscription,
  UserId
} from './actions/app.actions';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ServiceHelper, STORAGE } from './services/services-helper';
import { defer, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from './reducers/app.reducers';
import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { WeatherService } from './services/weather.service';
import {
  selectSelectedCityAndCurrentWeather,
  selectSelectedCityAndFiveDayWeather
} from './app.selectors';
import { CurrentWeather } from './models/weather.models';
import { City, FiveDayWeather } from '@ang-weather-nx/shared-data';
import { getRandomId } from './helpers/function-helpers';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private weatherService: WeatherService) {
  }

  private handleError = catchError(err => {
    console.log('Got an error during request', err);
    this.store.dispatch(new GotAnErrorDuringRequest(err));
    return of(null);
  });

  @Effect()
  initCity$ = defer(() => {
    const city = ServiceHelper.getLocalStorageItem(STORAGE.CITY);
    if (city) {
      return of(new SelectCity({ city }));
    }
  });

  @Effect()
  initUser$ = defer(() => {
    const userId = ServiceHelper.getLocalStorageItem(STORAGE.USER_ID) || getRandomId();
    ServiceHelper.setLocalStorageItem(STORAGE.USER_ID, userId);
    return of(new UserId({ userId }));
  });

  @Effect({ dispatch: false })
  selectCity$: Observable<SelectCity> = this.actions$.pipe(
    ofType<SelectCity>(AppActionTypes.SelectCityAction),
    tap(action => ServiceHelper.setLocalStorageItem(STORAGE.CITY, action.payload.city)));

  @Effect()
  loadAllCountries$: Observable<AllCountries> = this.actions$
    .pipe(
      ofType<AllCountriesRequested>(AppActionTypes.AllCountriesRequested),
      mergeMap(() => this.countriesService.getCountries().pipe(this.handleError)),
      map(countries => new AllCountries({ countries })));

  @Effect()
  loadAllSubscriptions$: Observable<AllSubscriptions> = this.actions$
    .pipe(
      ofType<AllSubscriptionsRequested>(AppActionTypes.AllSubscriptionsRequested),
      mergeMap(() => {
        const userId = ServiceHelper.getLocalStorageItem(STORAGE.USER_ID);
        return userId ? this.weatherService.getSubscriptions(userId).pipe(this.handleError) : of(null);
      }),
      map(subscriptions => new AllSubscriptions({ subscriptions }))
    );

  @Effect({ dispatch: false })
  addSubscription$: Observable<NewUserSubscription> = this.actions$.pipe(
    ofType<NewUserSubscription>(AppActionTypes.NewUserSubscriptionAction),
    mergeMap(({ payload }) => {
      // TODO refactor to take userId and cityId from storage and remove { dispatch: false }
      const userId = ServiceHelper.getLocalStorageItem(STORAGE.USER_ID);
      const city = ServiceHelper.getLocalStorageItem(STORAGE.CITY);
      const userSub = { userId, subscriptions: [{ city, pushSubscription: payload.subscription }] };
      return this.weatherService.addSubscription(userSub).pipe(this.handleError);
    }));

  @Effect({ dispatch: false })
  removeSubscription$: Observable<RemoveUserSubscription> = this.actions$.pipe(
    ofType<RemoveUserSubscription>(AppActionTypes.RemoveUserSubscriptionAction),
    mergeMap(() => {
      // TODO refactor to take userId and cityId from storage and remove { dispatch: false }
      const userId = ServiceHelper.getLocalStorageItem(STORAGE.USER_ID);
      const city = ServiceHelper.getLocalStorageItem(STORAGE.CITY);
      return this.weatherService.removeSubscription({ userId, cityId: city.id}).pipe(this.handleError);
    }));


  @Effect()
  loadCitiesByCountry$: Observable<Cities> = this.actions$
    .pipe(
      ofType<CitiesByCountryRequested>(AppActionTypes.CitiesByCountryRequested),
      mergeMap(({ payload }) => this.citiesService.getCitiesByCountry(payload.countryCode).pipe(this.handleError)),
      map(cities => new Cities({ cities })));

  @Effect()
  searchCities$: Observable<CityNames> = this.actions$
    .pipe(
      ofType<SearchCitiesRequested>(AppActionTypes.SearchCitiesRequested),
      mergeMap(({ payload }) => this.citiesService.searchCities(payload.term).pipe(this.handleError)),
      map(cityNames => new CityNames({ cityNames })));

  @Effect()
  currentWeather$: Observable<CurrentWeatherForecast> = this.actions$
    .pipe(
      ofType<CurrentWeatherRequested>(AppActionTypes.CurrentWeatherRequested),
      withLatestFrom(this.store.pipe(select(selectSelectedCityAndCurrentWeather))),
      filter(([action, data]) => !!data[0]),
      mergeMap(([action, data]) => {
        const selectedCity: City = data[0];
        const currentWeather: CurrentWeather = data[1];

        if (!currentWeather) {
          return this.weatherService.getCurrentWeatherByCityId(selectedCity.id).pipe(this.handleError);
        }

        return currentWeather.id === selectedCity.id ?
          of(currentWeather) : this.weatherService.getCurrentWeatherByCityId(selectedCity.id).pipe(this.handleError);
      }),
      map(currentWeather => new CurrentWeatherForecast({ currentWeather })));

  @Effect()
  fiveDayForecast$: Observable<FiveDayWeatherForecast> = this.actions$
    .pipe(
      ofType<FiveDayWeatherRequested>(AppActionTypes.FiveDayWeatherRequested),
      withLatestFrom(this.store.pipe(select(selectSelectedCityAndFiveDayWeather))),
      filter(([action, data]) => !!data[0]),
      mergeMap(([action, data]) => {
        const selectedCity: City = data[0];
        const fiveDayWeather: FiveDayWeather = data[1];

        if (!fiveDayWeather) {
          return this.weatherService.get5DayForecastByCityId(selectedCity.id).pipe(this.handleError);
        }

        return fiveDayWeather.city.id === selectedCity.id ?
          of(fiveDayWeather) : this.weatherService.get5DayForecastByCityId(selectedCity.id).pipe(this.handleError);
      }),
      map(fiveDayWeather => new FiveDayWeatherForecast({ fiveDayWeather })));

  @Effect()
  citiesWeatherWithinRectangleZone$: Observable<CitiesWeatherWithinRectangleZone> = this.actions$
    .pipe(
      ofType<CitiesWeatherWithinRectangleZoneRequested>(AppActionTypes.CitiesWeatherWithinRectangleZoneRequested),
      mergeMap(({ payload }) =>
        this.weatherService.getCitiesWeatherWithinRectangleZone(payload.boundingBox).pipe(this.handleError)),
      map(rectangleZoneWeather => new CitiesWeatherWithinRectangleZone({ rectangleZoneWeather })));
}
