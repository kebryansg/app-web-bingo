import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersPlayedComponent } from './numbers-played.component';

describe('NumbersPlayedComponent', () => {
  let component: NumbersPlayedComponent;
  let fixture: ComponentFixture<NumbersPlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumbersPlayedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumbersPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
