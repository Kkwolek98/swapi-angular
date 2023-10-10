import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardGridComponent } from './hero-card-grid.component';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Person } from 'src/app/models/interfaces/person';
import { PeopleStore } from 'src/app/stores/people.store';
import { GameStore } from '../../../../stores/game.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { MatCardModule } from '@angular/material/card';

describe('HeroCardGridComponent', () => {
  let component: HeroCardGridComponent;
  let fixture: ComponentFixture<HeroCardGridComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroCardGridComponent, HeroCardComponent],
      imports: [NgxsModule.forRoot([PeopleStore, GameStore]), HttpClientTestingModule, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardGridComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show CPU deck when isCpu is true', () => {
    component.isCpu = true;
    const mockCpuDeck: Person[] = [{}, {}, {}] as Person[];
    spyOn(store, 'select').and.returnValue(of(mockCpuDeck));

    fixture.detectChanges();

    const renderedCards = fixture.nativeElement.querySelectorAll('app-hero-card');
    expect(renderedCards.length).toBe(3);
  });

  it('should have flex-row-reverse container when CPU', () => {
    component.isCpu = true;
    const mockCpuDeck: Person[] = [{}, {}, {}] as Person[];
    spyOn(store, 'select').and.returnValue(of(mockCpuDeck));

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('div');
    expect(container).toBeTruthy();
    expect(container.classList.contains('flex-row-reverse')).toBe(true);
  });

  it('should not have flex-row-reverse container when player', () => {
    component.isCpu = false;
    const mockCpuDeck: Person[] = [{}, {}, {}] as Person[];
    spyOn(store, 'select').and.returnValue(of(mockCpuDeck));

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('div');
    expect(container).toBeTruthy();
    expect(container.classList.contains('flex-row-reverse')).toBe(false);
  });
});
