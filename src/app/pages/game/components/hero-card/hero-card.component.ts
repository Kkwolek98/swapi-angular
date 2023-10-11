import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Person } from 'src/app/models/interfaces/person';
import { GameDrawCard, GameStore } from '../../../../stores/game.store';
import { Observable } from 'rxjs';
import { Starship } from 'src/app/models/interfaces/starship';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardComponent {
  @Input() isCpu = false;
  @Input() limited = false;
  @Input() entity!: Person | Starship; // TODO: make it generic so it works with starships
  @Select(GameStore.playerCard) playerCard$?: Observable<Person | Starship>;

  constructor(private store: Store) { }

  public drawCard() {
    this.store.dispatch(new GameDrawCard(this.entity));
  }
}
