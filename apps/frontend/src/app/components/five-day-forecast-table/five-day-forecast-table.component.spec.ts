import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiveDayForecastTableComponent } from './five-day-forecast-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../../reducers/app.reducers';

describe('FiveDayForecastTableComponent', () => {
  let component: FiveDayForecastTableComponent;
  let fixture: ComponentFixture<FiveDayForecastTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, StoreModule.forRoot(reducers)],
      declarations: [ FiveDayForecastTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveDayForecastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
