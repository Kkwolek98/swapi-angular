import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/interfaces/person';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() person!: Person;
}
