import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPopUp1Component } from './add-product-pop-up1.component';

describe('AddProductPopUp1Component', () => {
  let component: AddProductPopUp1Component;
  let fixture: ComponentFixture<AddProductPopUp1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductPopUp1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPopUp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
