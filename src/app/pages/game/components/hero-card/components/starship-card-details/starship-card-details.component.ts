import { Component, Input } from '@angular/core';
import { Starship } from 'src/app/models/interfaces/starship';

@Component({
  selector: 'app-starship-card-details',
  templateUrl: './starship-card-details.component.html',
  styleUrls: ['./starship-card-details.component.css']
})
export class StarshipCardDetailsComponent {
  @Input() starship!: Starship;
}
