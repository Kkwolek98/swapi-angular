import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroCardGridComponent } from './components/hero-card-grid/hero-card-grid.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    GameComponent,
    HeroCardGridComponent,
    HeroCardComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule,
    SharedModule,
    MatCardModule
  ]
})
export class GameModule { }
