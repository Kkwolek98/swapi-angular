import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext } from "@ngxs/store";
import { StoreModel } from "../models/interfaces/store-model";
import { SwapiHttpService } from "../services/swapi-http.service";
import { tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SwapiResponse } from "../models/interfaces/swapi-response";
import { Starship } from "../models/interfaces/starship";

export type StarshipStoreModel = StoreModel<Starship>;

export class FetchStarships {
  static readonly type = '[starships] FetchStarships'
}

export class FetchStarshipsNext {
  static readonly type = '[starships] FetchStarshipsNext'
}

export class FetchStarshipsPrevious {
  static readonly type = '[starships] FetchStarshipsPrevious'
}

@State<StarshipStoreModel>({
  name: 'starships',
  defaults: {
    allResults: [],
    currentPage: [],
    count: 0,
    next: null,
    previous: null,
  }
})
@Injectable()
export class StarshipsStore implements NgxsOnInit {

  @Selector()
  static currentPage(state: StarshipStoreModel): Starship[] {
    return state.currentPage;
  }

  constructor(
    private swapiHttpService: SwapiHttpService,
    private http: HttpClient
  ) { }

  ngxsOnInit(ctx: StateContext<StarshipStoreModel>): void {
    console.log('Fetching starships...')
    ctx.dispatch(new FetchStarships());
  }

  @Action(FetchStarships)
  fetchStarships(ctx: StateContext<StarshipStoreModel>) {
    return this.swapiHttpService.getAllStarships$().pipe(
      tap((res) => {
        res.results.forEach((el) => {
          el.power = +el.crew;
          el.type = 'starship';
        });
        this.patchState(ctx, res);
      })
    );
  }

  @Action(FetchStarshipsNext)
  fetchNext(ctx: StateContext<StarshipStoreModel>) {
    const state = ctx.getState();

    if (!state.next) {
      throw new Error('No url for next page');
    }

    return this.http.get<SwapiResponse<Starship>>(state.next).pipe(
      tap((res) => {
        this.patchState(ctx, res);
      })
    );
  }

  @Action(FetchStarshipsPrevious)
  fetchPrevious(ctx: StateContext<StarshipStoreModel>) {
    const state = ctx.getState();

    if (!state.previous) {
      throw new Error('No url for previous page');
    }

    return this.http.get<SwapiResponse<Starship>>(state.previous).pipe(
      tap((res) => {
        this.patchState(ctx, res);
      })
    );
  }

  patchState(ctx: StateContext<StarshipStoreModel>, res: SwapiResponse<Starship>) {
    ctx.patchState({
      allResults: res.results, // TODO: merge results
      currentPage: res.results,
      count: res.count,
      next: res.next,
      previous: res.previous
    });
  }
}
