import { Component, Input } from '@angular/core';
import { Person } from 'src/app/models/interfaces/person';

@Component({
  selector: 'app-person-card-details',
  templateUrl: './person-card-details.component.html',
  styleUrls: ['./person-card-details.component.css']
})
export class PersonCardDetailsComponent {
  @Input() person!: Person;
}
