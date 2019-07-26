import { KeyValue } from '@angular/common';
import { Clouds, ForecastPeriod, Main, Precipitation, Weather, Wind } from '@ang-weather-nx/shared-data';

export type DaysMap = Map<string, DayValue>;
export type DaysKeyValue = KeyValue<string, DayValue>;

export interface DayValue {
  selected: boolean;
  periods: ForecastPeriod[];
}

export interface BoundingBox {
  westLng: number;
  northLat: number;
  eastLng: number;
  southLat: number;
  zoom: number;
}

interface Coord {
  lat: number;
  lon: number;
}

export class Country {
  code: string;
  name: string;
}

export class City {
  coord: Coord;
  country: string;
  id: number;
  name: string;
}

export class CurrentWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  clouds: Clouds;
  rain: Precipitation;
  snow: Precipitation;
  dt: number;
  sys:
    {
      type: number;
      id: number;
      message: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
  id: number;
  name: string;
  cod: number;
}

export class RectangleZoneWeather {
  calctime: number;
  cnt: number;
  cod: number;
  list: ForecastPeriod[];
}
