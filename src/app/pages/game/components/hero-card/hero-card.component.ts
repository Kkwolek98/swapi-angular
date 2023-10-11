import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Person } from 'src/app/models/interfaces/person';
import { GameDrawCard, GameStore } from '../../../../stores/game.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardComponent {
  @Input() isCpu = false;
  @Input() limited = false;
  @Input() person!: Person; // TODO: make it generic so it works with starships

  @Select(GameStore.playerCard) playerCard$?: Observable<Person>;

  constructor(private store: Store) { }

  public drawCard() {
    this.store.dispatch(new GameDrawCard(this.person));
  }
}
