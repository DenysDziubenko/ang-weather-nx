export class ConfigData {
  static ROUTE_PREFIX = 'api';
  static SUBSCRIPTIONS_URL = 'api/subscriptions';
  static FIREBASE_URL = 'https://weather-app-6e386.firebaseio.com/';
  static OPENWEATHERMAP_APPID = '547e48458270f5cd9a271cb7e1cdec51';
  static OPENWEATHERMAP_URL = 'https://api.openweathermap.org/data/2.5/';
  static VAPID_PUBLIC_KEY = 'BI3NVkrJAjjR1mFI408NCYtT-SnJ2KZrk5brxtRBySxrqoy_nIi4Ly1jnyB0YfYLXoF8QaEpYvZKO7eDJn-TA1M';
  static VAPID_PRIVATE_KEY = 'lzExeQb_2BdOGdyvxsBYXp1gxqfzCxVHmQit91GGFr8';
}

export class UserSubscriptions {
  userId: number;
  subscriptions: Array<{ city: City, pushSubscription: PushSubscription }>;
}

export class City {
  coord: Coord;
  country: string;
  id: number;
  name: string;
}

export interface Coord {
  lat: number;
  lon: number;
}

export class FiveDayWeather {
  cod: string;
  message: number;
  city: City;
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

export function getWeekDay(dt: number): string {
  const date = new Date(dt * 1000);
  const daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysArr[date.getDay()];
}
