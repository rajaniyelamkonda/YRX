import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassifiedComponent } from './new-classified.component';

describe('NewClassifiedComponent', () => {
  let component: NewClassifiedComponent;
  let fixture: ComponentFixture<NewClassifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClassifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClassifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
