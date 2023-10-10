import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { NgxsModule, Store } from '@ngxs/store';
import { PeopleStore } from '../../stores/people.store';
import { GameStore } from '../../stores/game.store';
import { Person } from '../../models/interfaces/person';
import { GameStart, GameNextRound } from '../../stores/game.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';;
import { TitleComponent } from 'src/app/shared/title/title.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent, TitleComponent],
      imports: [NgxsModule.forRoot([PeopleStore, GameStore]), HttpClientTestingModule, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start the game', () => {
    const mockCards: Person[] = [];
    const gameStartSpy = spyOn(store, 'dispatch');

    component.startGame(mockCards);

    expect(gameStartSpy).toHaveBeenCalledWith(new GameStart(mockCards));
  });

  it('should proceed to the next round', () => {
    const gameNextRoundSpy = spyOn(store, 'dispatch');

    component.nextRound();

    expect(gameNextRoundSpy).toHaveBeenCalledWith(new GameNextRound());
  });
});