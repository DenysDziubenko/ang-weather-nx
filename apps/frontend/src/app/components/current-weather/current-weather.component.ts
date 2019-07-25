import {Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {BoundingBox, City} from '../../models/weather.models';
import {Subscription} from 'rxjs';
import {} from 'googlemaps';
import {showTrigger} from '../../helpers/animations';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers/app.reducers';
import {CitiesWeatherWithinRectangleZoneRequested, CurrentWeatherRequested} from '../../actions/app.actions';
import {selectRectangleZoneWeather, selectSelectedCity} from '../../app.selectors';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  animations: [showTrigger]
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  @ViewChild('gmap', {static: true}) gmapElement: any;
  infowindow = new google.maps.InfoWindow();
  geoJSON;
  map: google.maps.Map;
  subs: Subscription[] = [];
  showCityTable = false;

  constructor(
    private renderer: Renderer2,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.subs.push(this.store.pipe(select(selectSelectedCity)).subscribe(city => {
      if (city) {
        this.store.dispatch(new CurrentWeatherRequested());
        this.showCityTable = true;
        this.showCityMap(city);
      }
    }));

    this.subs.push(this.store.pipe(select(selectRectangleZoneWeather)).subscribe((weather => {
      if (weather && weather.list && weather.list.length > 0) {
        this.resetData();
        weather.list.forEach(item => this.geoJSON.features.push(this.jsonToGeoJson(item)));
        this.map.data.addGeoJson(this.geoJSON);
      }
    })));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  showCityMap(selectedCity: City) {
    const {coord: {lat, lon}} = selectedCity;
    const mapProperties = {
      center: new google.maps.LatLng(lat, lon),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.renderer.setStyle(this.gmapElement.nativeElement, 'height', `100%`);
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProperties);

    google.maps.event.addListener(this.map, 'idle', this.requestNewData.bind(this));
    this.map.data.addListener('click', this.handleMapIconClick.bind(this));
  }

  private handleMapIconClick(event) {
    const {feature, latLng} = event;
    const icon = feature.getProperty('icon');
    const city = feature.getProperty('city');
    const temp = feature.getProperty('temperature');
    const weather = feature.getProperty('weather');
    const content = `<img alt="" src= ${icon}><br/><strong>${city}</strong><br/>${temp}&deg;C<br/>${weather}`;

    this.infowindow.setOptions({
      content,
      position: {lat: latLng.lat(), lng: latLng.lng()},
      pixelOffset: new google.maps.Size(0, -15)
    });
    this.infowindow.open(this.map);
  }

  private requestNewData() {
    const bounds = this.map.getBounds();
    const NE = bounds.getNorthEast();
    const SW = bounds.getSouthWest();
    const boundingBox: BoundingBox = {
      northLat: NE.lat(),
      eastLng: NE.lng(),
      southLat: SW.lat(),
      westLng: SW.lng(),
      zoom: this.map.getZoom()
    };

    this.store.dispatch(new CitiesWeatherWithinRectangleZoneRequested({boundingBox}));
  }

  private jsonToGeoJson(weatherItem) {
    const {name: city, weather, main, coord} = weatherItem;
    const {
      temp: temperature, temp_min: min, temp_max: max, humidity, pressure, speed: windSpeed, deg: windDegrees,
      gust: windGust
    } = main;
    const icon = `http://openweathermap.org/img/w/${weather[0].icon}.png`;

    this.map.data.setStyle(() => ({icon: {url: icon, anchor: new google.maps.Point(25, 25)}}));

    return {
      type: 'Feature',
      properties: {
        city, weather: weather[0].main, temperature, min, max, humidity, pressure, windSpeed, windDegrees,
        windGust, icon, coordinates: [coord.Lon, coord.Lat]
      },
      geometry: {type: 'Point', coordinates: [coord.Lon, coord.Lat]}
    };
  }

  private resetData() {
    this.geoJSON = {type: 'FeatureCollection', features: []};
    this.map.data.forEach(feature => this.map.data.remove(feature));
  }
}
