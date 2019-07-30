import { Action } from '@ngrx/store';
import {
  BoundingBox,
  Country,
  CurrentWeather,
  RectangleZoneWeather
} from '../models/weather.models';
import { City, FiveDayWeather, UserSubscriptions } from '@ang-weather-nx/shared-data';

export enum AppActionTypes {
  SelectCityAction = '[SelectCity] Action',
  UserIdAction = '[UserId] Action',
  SelectCountryAction = '[SelectCountry] Action',
  AllCountriesAction = '[AllCountries] Action',
  AllSubscriptionsAction = '[AllSubscriptions] Action',
  NewUserSubscriptionRequested = '[NewUserSubscriptionRequested] New User Subscription Requested',
  RemoveUserSubscriptionRequested = '[RemoveUserSubscriptionRequested] Remove User Subscription Requested',
  AllCountriesRequested = '[AllCountriesRequested] All Countries Requested',
  AllSubscriptionsRequested = '[AllSubscriptionsRequested] All Subscriptions Requested',
  CitiesByCountryRequested = '[CitiesByCountryRequested] Cities By Country Requested',
  CurrentWeatherRequested = '[CurrentWeatherRequested] Current Weather Requested',
  FiveDayWeatherRequested = '[FiveDayWeatherRequested] Five Day Weather Requested',
  SearchCitiesRequested = '[SearchCitiesRequested] Search Cities Requested',
  GotAnErrorDuringRequest = '[GotAnErrorDuringRequest] Got an error during request',
  CitiesWeatherWithinRectangleZoneRequested = '[CitiesWeatherWithinRectangleZoneRequested] Cities Weather Within Rectangle Zone Requested',
  CitiesWeatherWithinRectangleZone = '[CitiesWeatherWithinRectangleZone] Cities Weather Within Rectangle Zone',
  CitiesAction = '[CitiesAction] Action',
  CityNamesAction = '[CityNamesAction] Action',
  CurrentWeatherAction = '[CurrentWeather] Action',
  FiveDayWeatherAction = '[FiveDayWeather] Action'
}

export class SelectCity implements Action {
  readonly type = AppActionTypes.SelectCityAction;

  constructor(public payload: { city: City }) {
  }
}

export class UserId implements Action {
  readonly type = AppActionTypes.UserIdAction;

  constructor(public payload: { userId: number }) {
  }
}

export class Cities implements Action {
  readonly type = AppActionTypes.CitiesAction;

  constructor(public payload: { cities: City[] }) {
  }
}

export class CityNames implements Action {
  readonly type = AppActionTypes.CityNamesAction;

  constructor(public payload: { cityNames: string[] }) {
  }
}

export class SelectCountry implements Action {
  readonly type = AppActionTypes.SelectCountryAction;

  constructor(public payload: { country: Country }) {
  }
}

export class AllCountries implements Action {
  readonly type = AppActionTypes.AllCountriesAction;

  constructor(public payload: { countries: Country[] }) {
  }
}

export class CitiesWeatherWithinRectangleZone implements Action {
  readonly type = AppActionTypes.CitiesWeatherWithinRectangleZone;

  constructor(public payload: { rectangleZoneWeather: RectangleZoneWeather }) {
  }
}

export class AllCountriesRequested implements Action {
  readonly type = AppActionTypes.AllCountriesRequested;
}

export class NewUserSubscriptionRequested implements Action {
  readonly type = AppActionTypes.NewUserSubscriptionRequested;

  constructor(public payload: { subscription: any }) {
  }
}

export class RemoveUserSubscriptionRequested implements Action {
  readonly type = AppActionTypes.RemoveUserSubscriptionRequested;
}

export class AllSubscriptionsRequested implements Action {
  readonly type = AppActionTypes.AllSubscriptionsRequested;
}

export class AllSubscriptions implements Action {
  readonly type = AppActionTypes.AllSubscriptionsAction;

  constructor(public payload: { subscriptions: UserSubscriptions }) {
  }
}

export class CitiesWeatherWithinRectangleZoneRequested implements Action {
  readonly type = AppActionTypes.CitiesWeatherWithinRectangleZoneRequested;

  constructor(public payload: { boundingBox: BoundingBox }) {
  }
}

export class CitiesByCountryRequested implements Action {
  readonly type = AppActionTypes.CitiesByCountryRequested;

  constructor(public payload: { countryCode: string }) {
  }
}

export class SearchCitiesRequested implements Action {
  readonly type = AppActionTypes.SearchCitiesRequested;

  constructor(public payload: { term: string }) {
  }
}

export class CurrentWeatherRequested implements Action {
  readonly type = AppActionTypes.CurrentWeatherRequested;
}

export class FiveDayWeatherRequested implements Action {
  readonly type = AppActionTypes.FiveDayWeatherRequested;
}

export class GotAnErrorDuringRequest implements Action {
  readonly type = AppActionTypes.GotAnErrorDuringRequest;

  constructor(public payload: { error: any }) {
  }
}

export class CurrentWeatherForecast implements Action {
  readonly type = AppActionTypes.CurrentWeatherAction;

  constructor(public payload: { currentWeather: CurrentWeather }) {
  }
}

export class FiveDayWeatherForecast implements Action {
  readonly type = AppActionTypes.FiveDayWeatherAction;

  constructor(public payload: { fiveDayWeather: FiveDayWeather }) {
  }
}

export type AppActions =
  SelectCity |
  UserId |
  SelectCountry |
  AllCountries |
  AllSubscriptions |
  NewUserSubscriptionRequested |
  RemoveUserSubscriptionRequested |
  Cities |
  CityNames |
  CitiesWeatherWithinRectangleZone |
  CurrentWeatherForecast |
  FiveDayWeatherForecast |
  AllCountriesRequested |
  AllSubscriptionsRequested |
  CitiesByCountryRequested |
  CurrentWeatherRequested |
  FiveDayWeatherRequested |
  SearchCitiesRequested |
  GotAnErrorDuringRequest |
  CitiesWeatherWithinRectangleZoneRequested;
