import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClassifiedComponent } from './display-classified.component';

describe('DisplayClassifiedComponent', () => {
  let component: DisplayClassifiedComponent;
  let fixture: ComponentFixture<DisplayClassifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayClassifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayClassifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
