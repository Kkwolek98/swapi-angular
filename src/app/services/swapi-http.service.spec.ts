import { TestBed } from '@angular/core/testing';

import { SwapiHttpService } from './swapi-http.service';

describe('SwapiHttpService', () => {
  let service: SwapiHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
