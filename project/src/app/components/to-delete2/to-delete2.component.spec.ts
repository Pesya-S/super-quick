import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDelete2Component } from './to-delete2.component';

describe('ToDelete2Component', () => {
  let component: ToDelete2Component;
  let fixture: ComponentFixture<ToDelete2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDelete2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDelete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
