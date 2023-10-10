import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiHttpService } from './swapi-http.service';
import { SwapiResponse } from '../models/interfaces/swapi-response';
import { Starship } from '../models/interfaces/starship';
import { Person } from '../models/interfaces/person';
import { BASE_URL } from 'src/consts';
import { DefaultSearchFields, StarshipsSearchFields } from '../models/interfaces/search-fields';

describe('SwapiHttpService', () => {
  let service: SwapiHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiHttpService]
    });
    service = TestBed.inject(SwapiHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all starships', () => {
    const dummySearchParams: StarshipsSearchFields = { model: 'XYZ' };
    const dummyResponse: SwapiResponse<Starship> = { results: [], count: 0, next: null, previous: null };

    service.getAllStarships$(dummySearchParams).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpMock.expectOne(`${BASE_URL}/starships?model=XYZ`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResponse);
  });

  it('should get all people', () => {
    const dummySearchParams: DefaultSearchFields = { name: 'John' };
    const dummyResponse: SwapiResponse<Person> = { results: [], count: 0, next: null, previous: null };

    service.getAllPeople$(dummySearchParams).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpMock.expectOne(`${BASE_URL}/people?name=John`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResponse);
  });

  it('should get a starship by id', () => {
    const dummyId = '1';
    const dummyResponse: Starship = {} as Starship;

    service.getStarshipById$(dummyId).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpMock.expectOne(`${BASE_URL}/starships/${dummyId}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResponse);
  });

  it('should get a person by id', () => {
    const dummyId = '1';
    const dummyResponse: Person = {} as Person;

    service.getPersonById$(dummyId).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpMock.expectOne(`${BASE_URL}/people/${dummyId}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResponse);
  });
});
