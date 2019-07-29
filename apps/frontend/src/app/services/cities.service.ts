import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers/app.reducers';
import { Cities } from '../actions/app.actions';
import { City, ConfigData } from '@ang-weather-nx/shared-data';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private path = `cities.json`;

  constructor(
    private http: HttpClient,
    private store: Store<State>) {
  }

  searchCities(term: string): Observable<string[]> {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(`${ConfigData.FIREBASE_URL}${this.path}?orderBy="name"&equalTo="${term}"`)
      .pipe(map(response => {
        this.store.dispatch(new Cities({ cities: Object.values(response) }));
        return Object.keys(response).map(key => `${response[key].name}, ${response[key].country}`);
      }));
  }

  getCitiesByCountry(countryCode: string): Observable<City[]> {
    const limit = `&limitToFirst=2000`;
    const url = `${ConfigData.FIREBASE_URL}${this.path}?orderBy="country"&equalTo="${countryCode}"${limit}`;
    return this.http.get<City[]>(url)
      .pipe(mergeMap(shortResponse => {
          const cities = Object.values(shortResponse);
          this.store.dispatch(new Cities({ cities }));
          return this.http.get<City[]>(url.replace(limit, ''), { params: { silent: 'true' } })
            .pipe(map(longResponse => {
              return Object.values(longResponse);
            }));
        })
      );
  }
}
