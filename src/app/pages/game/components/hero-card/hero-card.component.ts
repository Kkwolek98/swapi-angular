import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Person } from 'src/app/models/interfaces/person';
import { GameDrawCard, GameStore } from '../../../../stores/game.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() isCpu = false;
  @Input() limited = false;
  @Input() person!: Person;

  @Select(GameStore.playerCard) playerCard$?: Observable<Person>;

  constructor(private store: Store) { }

  public drawCard() {
    this.store.dispatch(new GameDrawCard(this.person)).subscribe((winner) => console.log(winner));
  }
}
