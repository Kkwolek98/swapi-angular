import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCardGridComponent } from './hero-card-grid.component';

describe('HeroCardGridComponent', () => {
  let component: HeroCardGridComponent;
  let fixture: ComponentFixture<HeroCardGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroCardGridComponent]
    });
    fixture = TestBed.createComponent(HeroCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
