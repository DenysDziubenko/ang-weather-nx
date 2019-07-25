import {KeyValue} from '@angular/common';

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

export class FiveDayWeather {
  cod: string;
  message: number;
  city:
    {
      id: number;
      name: string;
      coord:
        {
          lat: number;
          lon: number;
        };
      country: string;
    };
  cnt: number;
  list: ForecastPeriod[];
}

export class RectangleZoneWeather {
  calctime: number;
  cnt: number;
  cod: number;
  list: ForecastPeriod[];
}

class Main {
  temp: number;
  pressure: number;
  humidity: number;
  'temp_min': number;
  'temp_max': number;
  'sea_level'?: number;
  'grnd_level'?: number;
  'temp_kf'?: number;
}

class Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

class Clouds {
  all: number;
}

class Wind {
  speed: number;
  deg: number;
}

class Precipitation {
  '1h': number;
  '3h': number;
}

export class ForecastPeriod {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain: Precipitation;
  snow: Precipitation;
  'dt_txt': string;
}
