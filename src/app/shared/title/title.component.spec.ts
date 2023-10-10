import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-title>{{ title }}</app-title>`,
})
class TestComponent {
  public title: string = '';
}

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent, TestComponent]
    });
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ng-content', () => {
    const testFixture = TestBed.createComponent(TestComponent);
    const title = 'Hello!';
    testFixture.componentInstance.title = title;
    testFixture.detectChanges();
    const debug: DebugElement = testFixture.debugElement.query(By.css('h1'));

    expect(debug.nativeElement.textContent).toEqual(title);
  });
});
