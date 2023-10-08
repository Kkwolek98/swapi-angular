import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/interfaces/person';
import { PeopleStore } from 'src/app/stores/people.store';

@Component({
  selector: 'app-hero-card-grid',
  templateUrl: './hero-card-grid.component.html',
  styleUrls: ['./hero-card-grid.component.scss']
})
export class HeroCardGridComponent {
  @Select(PeopleStore.currentPage) peopleCurrentPage$!: Observable<Person[]>;
}
