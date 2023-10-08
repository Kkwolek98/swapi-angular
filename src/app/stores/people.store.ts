import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import { Person } from "../models/interfaces/person";
import { StoreModel } from "../models/interfaces/store-model";
import { SwapiHttpService } from "../services/swapi-http.service";
import { tap } from "rxjs";

export type PeopleStoreModel = StoreModel<Person>;

export class FetchPeople {
  static readonly type = '[people] FetchPeople'
}

@State<PeopleStoreModel>({
  name: 'people',
  defaults: {
    allResults: [],
    currentPage: [],
    count: 0,
    next: undefined,
    previous: undefined,
  }
})
@Injectable()
export class PeopleStore implements NgxsOnInit {

  constructor(
    private swapiHttpService: SwapiHttpService
  ) { }

  ngxsOnInit(ctx: StateContext<PeopleStoreModel>): void {
    console.log('Fetching people...')
    ctx.dispatch(new FetchPeople());
  }

  @Action(FetchPeople)
  fetchPeople(ctx: StateContext<PeopleStoreModel>) {
    return this.swapiHttpService.getAllPeople$().pipe(
      tap((res) => {
        ctx.patchState({
          allResults: res.results, // TODO: merge results
          currentPage: res.results,
          count: res.count,
          next: res.next,
          previous: res.previous
        })
      })
    );
  }

}
