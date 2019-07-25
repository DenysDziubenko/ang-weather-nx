import { TestBed } from '@angular/core/testing';

import { CitiesService } from './cities.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../reducers/app.reducers';

describe('CitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, StoreModule.forRoot(reducers)]
  }));

  it('should be created', () => {
    const service: CitiesService = TestBed.get(CitiesService);
    expect(service).toBeTruthy();
  });
});
