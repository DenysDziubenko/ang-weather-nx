import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum STORAGE {
  CURRENT_FORECAST = 'CURRENT_FORECAST',
  FIVE_DAY_FORECAST = 'FIVE_FORECAST',
  CITY = 'CITY',
}

@Injectable({
  providedIn: 'root'
})
export class ServiceHelper {
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
