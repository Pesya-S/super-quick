import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPasswordPopUpComponent } from './invalid-password-pop-up.component';

describe('InvalidPasswordPopUpComponent', () => {
  let component: InvalidPasswordPopUpComponent;
  let fixture: ComponentFixture<InvalidPasswordPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidPasswordPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidPasswordPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
