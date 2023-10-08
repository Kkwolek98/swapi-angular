import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SwapiResponse } from '../models/interfaces/swapi-response';
import { Starship } from '../models/interfaces/starship';
import { BASE_URL } from 'src/consts';
import { Person } from '../models/interfaces/person';
import { DefaultSearchFields, StarshipsSearchFields } from '../models/interfaces/search-fields';

@Injectable({
  providedIn: 'root'
})
export class SwapiHttpService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllStarships$(searchParams?: StarshipsSearchFields): Observable<SwapiResponse<Starship>> {
    return this.http.get<SwapiResponse<Starship>>(BASE_URL + '/starships', { params: { ...searchParams } });
  }

  public getAllPeople$(searchParams?: DefaultSearchFields): Observable<SwapiResponse<Person>> {
    return this.http.get<SwapiResponse<Person>>(BASE_URL + '/people', { params: { ...searchParams } });
  }

  public getStarshipById$(id: string): Observable<Starship> {
    return this.http.get<Starship>(BASE_URL + '/starships/' + id);
  }

  public getPersonById$(id: string): Observable<Person> {
    return this.http.get<Person>(BASE_URL + '/people/' + id);
  }
}
