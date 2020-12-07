import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandComponent } from './add-stand.component';

describe('AddStandComponent', () => {
  let component: AddStandComponent;
  let fixture: ComponentFixture<AddStandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
