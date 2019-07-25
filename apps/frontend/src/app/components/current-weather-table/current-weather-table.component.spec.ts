import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentWeatherTableComponent } from './current-weather-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../../reducers/app.reducers';

describe('CurrentWeatherTableComponent', () => {
  let component: CurrentWeatherTableComponent;
  let fixture: ComponentFixture<CurrentWeatherTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, StoreModule.forRoot(reducers)],
      declarations: [ CurrentWeatherTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
