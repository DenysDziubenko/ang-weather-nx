import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {City, Country, CurrentWeather, FiveDayWeather, RectangleZoneWeather} from '../models/weather.models';
import {AppActions, AppActionTypes} from '../actions/app.actions';
import {storeFreeze} from 'ngrx-store-freeze';
import {routerReducer} from '@ngrx/router-store';

export interface AppState {
  selectedCity: City;
  selectedCountry: Country;
  allCountries: Country[];
  cities: City[];
  cityNames: string[];
  currentWeather: CurrentWeather;
  fiveDayWeather: FiveDayWeather;
  rectangleZoneWeather: RectangleZoneWeather;
  error: any;
}

export const initialAppState: AppState = {
  selectedCity: undefined,
  selectedCountry: undefined,
  allCountries: [],
  cities: [],
  cityNames: [],
  currentWeather: undefined,
  fiveDayWeather: undefined,
  rectangleZoneWeather: undefined,
  error: undefined
};

export interface State {
  appState: AppState;
  router: any;
}

export function appReducer(state: AppState = initialAppState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.SelectCityAction:
      return {...state, ...{selectedCity: action.payload.city}};
    case AppActionTypes.SelectCountryAction:
      return {...state, ...{selectedCountry: action.payload.country}};
    case AppActionTypes.AllCountriesAction:
      return {...state, ...{allCountries: action.payload.countries}};
    case AppActionTypes.CitiesAction:
      return {...state, ...{cities: action.payload.cities}};
    case AppActionTypes.CityNamesAction:
      return {...state, ...{cityNames: action.payload.cityNames}};
    case AppActionTypes.CurrentWeatherAction:
      return {...state, ...{currentWeather: action.payload.currentWeather}};
    case AppActionTypes.FiveDayWeatherAction:
      return {...state, ...{fiveDayWeather: action.payload.fiveDayWeather}};
    case AppActionTypes.GotAnErrorDuringRequest:
      return {...state, ...{error: action.payload.error}};
    case AppActionTypes.CitiesWeatherWithinRectangleZone:
      return {...state, ...{rectangleZoneWeather: action.payload.rectangleZoneWeather}};
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  appState: appReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
