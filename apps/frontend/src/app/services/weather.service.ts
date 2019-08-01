import { Injectable } from '@angular/core';
import { BoundingBox, CurrentWeather, RectangleZoneWeather } from '../models/weather.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigData, FiveDayWeather, UserSubscriptions } from '@ang-weather-nx/shared-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getSubscriptions(userId: number): Observable<UserSubscriptions> {
    const url = `${ConfigData.SUBSCRIPTIONS_URL}?&userId=${userId}`;
    return this.http.get<UserSubscriptions>(url);
  }

  addSubscription(sub: UserSubscriptions): Observable<UserSubscriptions> {
    return this.http.post<UserSubscriptions>(ConfigData.SUBSCRIPTIONS_URL, sub);
  }

  removeSubscription(userAndCityIds: { userId: number, cityId: number }): Observable<UserSubscriptions> {
    const url = `${ConfigData.SUBSCRIPTIONS_URL}?&userId=${userAndCityIds.userId}&cityId=${userAndCityIds.cityId}`;
    return this.http.delete<UserSubscriptions>(url);
  }

  getCurrentWeatherByCityId(id: number): Observable<CurrentWeather> {
    const url = `${ConfigData.OPENWEATHERMAP_URL}weather?id=${id}&appid=${ConfigData.OPENWEATHERMAP_APPID}&units=metric`;
    return this.http.get<CurrentWeather>(url);
  }

  getCitiesWeatherWithinRectangleZone(boundingBox: BoundingBox): Observable<RectangleZoneWeather> {
    const { westLng, northLat, eastLng, southLat, zoom } = boundingBox;
    const firstPartOfUrl = `${ConfigData.OPENWEATHERMAP_URL}box/city?bbox=${westLng},${northLat},${eastLng},${southLat},${zoom}`;
    const url = `${firstPartOfUrl}&cluster=yes&format=json&appid=${ConfigData.OPENWEATHERMAP_APPID}`;
    return this.http.get<RectangleZoneWeather>(url);
  }

  get5DayForecastByCityId(id: number): Observable<FiveDayWeather> {
    const url = `${ConfigData.OPENWEATHERMAP_URL}forecast?id=${id}&appid=${ConfigData.OPENWEATHERMAP_APPID}&units=metric`;
    return this.http.get<FiveDayWeather>(url);
  }
}
