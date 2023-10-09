import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PeopleStore } from '../../stores/people.store';
import { Observable } from 'rxjs';
import { Person } from '../../models/interfaces/person';
import { GameNextRound, GameStart, GameStore } from '../../stores/game.store';
import { Starship } from '../../models/interfaces/starship';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
 @Select(PeopleStore.currentPage) people$?: Observable<Person[]>;
 @Select(GameStore.started) isGameStarted$?: Observable<boolean>;
 @Select(GameStore.playerPoints) playerPoints$?: Observable<number>;
 @Select(GameStore.cpuPoints) cpuPoints$?: Observable<number>;
 @Select(GameStore.playerCard) playerCard$?: Observable<Person>;
 @Select(GameStore.cpuCard) cpuCard$?: Observable<Person>;
 @Select(GameStore.playerDeck) playerDeck$?: Observable<Person[]>;

 constructor(private store: Store) { }

 public startGame(cards: Person[] | Starship[]): void {
  this.store.dispatch(new GameStart(cards));
 }

 public nextRound(): void {
  this.store.dispatch(new GameNextRound());
 }

}
