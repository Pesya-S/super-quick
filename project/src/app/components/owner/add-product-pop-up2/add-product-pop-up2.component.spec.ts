import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPopUp2Component } from './add-product-pop-up2.component';

describe('AddProductPopUp2Component', () => {
  let component: AddProductPopUp2Component;
  let fixture: ComponentFixture<AddProductPopUp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductPopUp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPopUp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
