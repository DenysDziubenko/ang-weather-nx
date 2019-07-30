import {createSelector} from '@ngrx/store';

export const selectCityAppState = state => state.appState;

export const selectSelectedCity = createSelector(
  selectCityAppState,
  state => state.selectedCity
);

export const selectCities = createSelector(
  selectCityAppState,
  state => state.cities
);

export const selectCityNames = createSelector(
  selectCityAppState,
  state => state.cityNames
);

export const selectCurrentWeather = createSelector(
  selectCityAppState,
  state => state.currentWeather
);

export const selectSelectedCityAndCurrentWeather = createSelector(
  selectCityAppState,
  state => [state.selectedCity, state.currentWeather]
);

export const selectError = createSelector(
  selectCityAppState,
  state => state.error
);

export const selectFiveDayWeather = createSelector(
  selectCityAppState,
  state => state.fiveDayWeather
);

export const selectSelectedCityAndFiveDayWeather = createSelector(
  selectCityAppState,
  state => [state.selectedCity, state.fiveDayWeather]
);

export const selectRectangleZoneWeather = createSelector(
  selectCityAppState,
  state => state.rectangleZoneWeather
);

export const selectAllSubscriptions = createSelector(
  selectCityAppState,
  state => state.allSubscriptions
);

export const selectSelectedCityAndAllSubscriptions = createSelector(
  selectCityAppState,
  state => [state.selectedCity, state.allSubscriptions]
);
