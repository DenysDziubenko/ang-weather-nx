import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export enum STORAGE {
  CURRENT_FORECAST = 'CURRENT_FORECAST',
  FIVE_DAY_FORECAST = 'FIVE_FORECAST',
  CITY = 'CITY',
}

@Injectable({
  providedIn: 'root'
})
export class ServiceHelper {
  static FIREBASE_URL = 'https://weather-app-6e386.firebaseio.com/';
  static OPENWEATHERMAP_APPID = '547e48458270f5cd9a271cb7e1cdec51';
  static OPENWEATHERMAP_URL = 'https://api.openweathermap.org/data/2.5/';
  static HTTP_OPTIONS = {
    headers: new HttpHeaders().set('Content-Type', 'text/plain')
  };

  spinner$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  static setLocalStorageItem(key: STORAGE, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocalStorageItem(key: STORAGE): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
