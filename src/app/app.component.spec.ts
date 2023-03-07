import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'Smart Dental'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('Smart Dental');
  });

  it('should remove class toggled when clicked wrapper', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.removeToggled();
    const appDebug: DebugElement = fixture.debugElement;
    const wrapperDebug: DebugElement = appDebug.query(By.css('.wrapper'));
    const wrapperElement: HTMLElement = wrapperDebug.nativeElement;
    fixture.detectChanges();

    expect(wrapperElement.classList).not.toContain('toggled');
  });

});
