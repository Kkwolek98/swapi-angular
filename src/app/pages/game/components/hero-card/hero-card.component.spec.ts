import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { MatCardModule } from '@angular/material/card';
import { Store, NgxsModule } from '@ngxs/store';
import { GameDrawCard, GameStore } from '../../../../stores/game.store';
import { Person } from 'src/app/models/interfaces/person';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroCardComponent],
      imports: [MatCardModule, NgxsModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    const mockPerson: Partial<Person> = {
      name: 'Luke Skywalker',
      mass: '77 kg',
      gender: 'male',
      birth_year: '19 BBY',
      height: '172 cm',
      eye_color: 'blue',
    };
    component.person = mockPerson as Person;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call drawCard when the button is clicked', () => {
    const drawCardSpy = spyOn(component, 'drawCard');
    const drawButton = fixture.nativeElement.querySelector('button');

    drawButton.click();

    expect(drawCardSpy).toHaveBeenCalled();
  });

  it('should dispatch a GameDrawCard action when drawCard is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.drawCard();

    const expectedAction = new GameDrawCard(component.person);

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should have draw button disabled for cpu', () => {
    component.isCpu = true;
    fixture.detectChanges();

    const drawButton = fixture.nativeElement.querySelector('button');

    expect(drawButton.disabled).toBeTrue();
  });
});
