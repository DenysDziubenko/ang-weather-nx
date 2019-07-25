import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SwUpdate } from '@angular/service-worker';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers/app.reducers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        NgbModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        AppComponent,
        SpinnerComponent
      ],
      providers: [
        {
          provide: SwUpdate,
          useValue: {
            messages: {
              subscribe: () => () => {
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
