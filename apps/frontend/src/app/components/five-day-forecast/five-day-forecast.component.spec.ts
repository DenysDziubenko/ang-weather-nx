import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FiveDayForecastComponent} from './five-day-forecast.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FiveDayForecastTableComponent} from '../five-day-forecast-table/five-day-forecast-table.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PeriodFilterPipe} from '../../pipes/period-filter.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {ScrollToCenterDirective} from '../../directives/scroll-to-center.directive';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../../reducers/app.reducers';

describe('FiveDayForecastComponent', () => {
  let component: FiveDayForecastComponent;
  let fixture: ComponentFixture<FiveDayForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, StoreModule.forRoot(reducers)],
      declarations: [FiveDayForecastComponent, FiveDayForecastTableComponent, PeriodFilterPipe, ScrollToCenterDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
