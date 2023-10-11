import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PeopleStore } from '../../stores/people.store';
import { Observable, combineLatest, map } from 'rxjs';
import { Person } from '../../models/interfaces/person';
import { GameNextRound, GameStart, GameStore } from '../../stores/game.store';
import { Starship } from '../../models/interfaces/starship';
import { StarshipsStore } from 'src/app/stores/starships.store';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  @Select(PeopleStore.currentPage) people$?: Observable<Person[]>;
  @Select(StarshipsStore.currentPage) starships$?: Observable<Person[]>;
  @Select(GameStore.started) isGameStarted$?: Observable<boolean>;
  @Select(GameStore.playerPoints) playerPoints$?: Observable<number>;
  @Select(GameStore.cpuPoints) cpuPoints$?: Observable<number>;
  @Select(GameStore.playerCard) playerCard$!: Observable<Person>;
  @Select(GameStore.cpuCard) cpuCard$!: Observable<Person>;
  @Select(GameStore.playerDeck) playerDeck$?: Observable<Person[]>;

  public winner$: Observable<'player' | 'cpu' | 'tie' | null> =
    combineLatest([this.playerCard$, this.cpuCard$]).pipe(map(([playerCard, cpuCard]) => {
      if (!playerCard || !cpuCard) return null;
      if (playerCard.power === cpuCard.power) return 'tie';
      if (playerCard.power > cpuCard.power) return 'player';
      return 'cpu';
    }));

  constructor(private store: Store) { }

  public startGame(cards: Person[] | Starship[]): void {
    this.store.dispatch(new GameStart(cards));
  }

  public nextRound(): void {
    this.store.dispatch(new GameNextRound());
  }


}
