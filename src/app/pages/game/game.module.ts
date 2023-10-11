import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroCardGridComponent } from './components/hero-card-grid/hero-card-grid.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { GameStore } from '../../stores/game.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PersonCardDetailsComponent } from './components/hero-card/components/person-card-details/person-card-details.component';
import { StarshipCardDetailsComponent } from './components/hero-card/components/starship-card-details/starship-card-details.component';



@NgModule({
  declarations: [
    GameComponent,
    HeroCardGridComponent,
    HeroCardComponent,
    PersonCardDetailsComponent,
    StarshipCardDetailsComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule,
    SharedModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    NgxsModule.forFeature([
      GameStore
    ]),
    MatProgressSpinnerModule
  ]
})
export class GameModule { }
