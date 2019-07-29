import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { bufferCount, debounceTime, distinctUntilChanged, map, skipWhile, switchMap } from 'rxjs/operators';
import { Country } from './models/weather.models';
import { selectedTrigger, showTrigger } from './helpers/animations';
import { SwUpdate } from '@angular/service-worker';
import { select, Store } from '@ngrx/store';
import { State } from './reducers/app.reducers';
import {
  AllCountriesRequested, AllSubscriptionsRequested,
  CitiesByCountryRequested,
  SearchCitiesRequested,
  SelectCity,
  SelectCountry
} from './actions/app.actions';
import { selectCities, selectCityNames, selectError } from './app.selectors';
import { City } from '@ang-weather-nx/shared-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  animations: [selectedTrigger, showTrigger]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('citySearch', { static: false }) citySearchElement: any;
  @ViewChild('dialog', { static: false }) dialogElement: any;
  subs: Subscription[] = [];
  currentUrl: string;
  cityText: string;
  countryText: string;
  allCountries: Country[];
  cities: City[];
  selectedCountry: Country;
  selectedCity: City;
  isCollapsed = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private store: Store<State>) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Updates to new version?')) {
          window.location.reload();
        }
      });
    }

    this.store.dispatch(new AllCountriesRequested());
    this.store.dispatch(new AllSubscriptionsRequested());

    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd && e.url) {
        this.currentUrl = e.urlAfterRedirects || e.url;
      }
    });

    this.subs.push(this.store.subscribe(state => {
      const { selectedCity, allCountries, cities } = state.appState;
      this.allCountries = allCountries;
      this.cities = cities;
      if (!this.selectedCity && selectedCity) {
        this.selectedCity = selectedCity;
        this.isCollapsed = true;
        this.cityText = `${this.selectedCity.name}, ${this.selectedCity.country}`;
      }
    }));


    const sub1: Subscription = this.store
      .pipe(
        select(selectCities),
        skipWhile(cities => !!cities.length),
        bufferCount(5)
      )
      .subscribe(cities => {
        if (cities.every(city => !city.length)) {
          this.modalService.open(this.dialogElement, { centered: true });
          sub1.unsubscribe();
        }
      });

    this.subs.push(this.store.pipe(select(selectError))
      .subscribe(error => {
        if (error) {
          const message = error.message;
          this.errorMessage = `Got an error during request: ${message ? message : JSON.stringify(error)}`;
          this.modalService.open(this.dialogElement, { centered: true });
        }
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  showCurrentWeather() {
    this.router.navigateByUrl('/currentWeather');
  }

  show5dayForecast() {
    this.router.navigateByUrl('/fiveDayForecast');
  }

  searchCitiesByCountry({ item: countryName }) {
    this.selectedCountry = this.allCountries.find(country => country.name === countryName);
    if (this.selectedCountry) {
      this.store.dispatch(new SelectCountry({ country: this.selectedCountry }));
      this.store.dispatch(new CitiesByCountryRequested({ countryCode: this.selectedCountry.code }));
    }
  }

  selectCity({ item: cityName }) {
    this.isCollapsed = true;
    this.selectedCity = this.cities.find(city => `${city.name}, ${city.country}` === cityName);
    this.store.dispatch(new SelectCity({ city: this.selectedCity }));
  }

  searchCountries = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => {
        if (term.length < 2) {
          return [];
        }

        const countries = this.allCountries.map(country => country.name);
        return countries
          .filter(countryName => countryName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }));

  searchCities = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return [];
        }

        if (!this.selectedCountry || !this.countryText) {
          this.store.dispatch(new SearchCitiesRequested({ term: term.charAt(0).toUpperCase() + term.slice(1) }));
          return this.store.pipe(select(selectCityNames));
        }

        const cities = this.cities.map(city => `${city.name}, ${city.country}`);

        return of(cities
          .filter(cityName => cityName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
      }));
}
