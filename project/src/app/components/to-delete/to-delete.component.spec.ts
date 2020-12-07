import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDeleteComponent } from './to-delete.component';

describe('ToDeleteComponent', () => {
  let component: ToDeleteComponent;
  let fixture: ComponentFixture<ToDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
