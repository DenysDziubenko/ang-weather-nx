import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../models/weather.models';
import {ServiceHelper} from './services-helper';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private path = `countries.json`;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${ServiceHelper.FIREBASE_URL}${this.path}`);
  }
}
