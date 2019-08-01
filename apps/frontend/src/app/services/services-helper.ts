import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum STORAGE {
  CURRENT_FORECAST = 'CURRENT_FORECAST',
  FIVE_DAY_FORECAST = 'FIVE_FORECAST',
  CITY = 'CITY',
  USER_ID = 'USER_ID',
}

@Injectable({
  providedIn: 'root'
})
export class ServiceHelper {
  static HTTP_OPTIONS_TEXT_PLAIN = {
    headers: new HttpHeaders().set('Content-Type', 'text/plain')
  };
  static HTTP_OPTIONS_APP_JSON = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  spinner$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  static setLocalStorageItem(key: STORAGE, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getLocalStorageItem(key: STORAGE): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
