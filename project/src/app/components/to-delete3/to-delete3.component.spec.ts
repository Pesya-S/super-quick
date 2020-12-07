import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDelete3Component } from './to-delete3.component';

describe('ToDelete3Component', () => {
  let component: ToDelete3Component;
  let fixture: ComponentFixture<ToDelete3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDelete3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDelete3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
