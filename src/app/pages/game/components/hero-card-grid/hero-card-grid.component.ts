import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/interfaces/person';
import { PeopleStore } from 'src/app/stores/people.store';
import { GameStore } from '../../../../stores/game.store';

@Component({
  selector: 'app-hero-card-grid',
  templateUrl: './hero-card-grid.component.html',
  styleUrls: ['./hero-card-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardGridComponent {
  @Input() isCpu = false;
  @Select(PeopleStore.currentPage) peopleCurrentPage$!: Observable<Person[]>;
  @Select(GameStore.cpuDeck) cpuDeck$?: Observable<Person[]>; // TODO: Person or Starship
  @Select(GameStore.playerDeck) playerDeck$?: Observable<Person[]>; // TODO: Person or Starship 
}
