import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/weather.models';
import { ConfigData } from '@ang-weather-nx/shared-data';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private path = `countries.json`;

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${ConfigData.FIREBASE_URL}${this.path}`);
  }
}
