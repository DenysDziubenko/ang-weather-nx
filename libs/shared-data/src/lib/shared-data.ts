export class ConfigData {
  static FIREBASE_URL = 'https://weather-app-6e386.firebaseio.com/';
  static OPENWEATHERMAP_APPID = '547e48458270f5cd9a271cb7e1cdec51';
  static OPENWEATHERMAP_URL = 'https://api.openweathermap.org/data/2.5/';
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

export class Main {
  temp: number;
  pressure: number;
  humidity: number;
  'temp_min': number;
  'temp_max': number;
  'sea_level'?: number;
  'grnd_level'?: number;
  'temp_kf'?: number;
}

export class Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export class Clouds {
  all: number;
}

export class Wind {
  speed: number;
  deg: number;
}

export class Precipitation {
  '1h': number;
  '3h': number;
}
