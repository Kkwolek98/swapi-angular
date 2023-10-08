import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import { Person } from "../models/interfaces/person";
import { StoreModel } from "../models/interfaces/store-model";
import { SwapiHttpService } from "../services/swapi-http.service";
import { tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SwapiResponse } from "../models/interfaces/swapi-response";

export type PeopleStoreModel = StoreModel<Person>;

export class FetchPeople {
  static readonly type = '[people] FetchPeople'
}

export class FetchPeopleNext {
  static readonly type = '[people] FetchPeopleNext'
}

export class FetchPeoplePrevious {
  static readonly type = '[people] FetchPeoplePrevious'
}

@State<PeopleStoreModel>({
  name: 'people',
  defaults: {
    allResults: [],
    currentPage: [],
    count: 0,
    next: null,
    previous: null,
  }
})
@Injectable()
export class PeopleStore implements NgxsOnInit {

  constructor(
    private swapiHttpService: SwapiHttpService,
    private http: HttpClient
  ) { }

  ngxsOnInit(ctx: StateContext<PeopleStoreModel>): void {
    console.log('Fetching people...')
    ctx.dispatch(new FetchPeople());
  }

  @Action(FetchPeople)
  fetchPeople(ctx: StateContext<PeopleStoreModel>) {
    return this.swapiHttpService.getAllPeople$().pipe(
      tap((res) => {
        this.patchState(ctx, res);
      })
    );
  }

  @Action(FetchPeopleNext)
  fetchNext(ctx: StateContext<PeopleStoreModel>) {
    const state = ctx.getState();

    if (!state.next) {
      throw new Error('No url for next page');
    }

    return this.http.get<SwapiResponse<Person>>(state.next).pipe(
      tap((res) => {
        this.patchState(ctx, res);
      })
    );
  }

  @Action(FetchPeoplePrevious)
  fetchPrevious(ctx: StateContext<PeopleStoreModel>) {
    const state = ctx.getState();

    if (!state.previous) {
      throw new Error('No url for previous page');
    }

    return this.http.get<SwapiResponse<Person>>(state.previous).pipe(
      tap((res) => {
        this.patchState(ctx, res);
      })
    );
  }

  patchState(ctx: StateContext<PeopleStoreModel>, res: SwapiResponse<Person>) {
    ctx.patchState({
      allResults: res.results, // TODO: merge results
      currentPage: res.results,
      count: res.count,
      next: res.next,
      previous: res.previous
    });
  }
}
