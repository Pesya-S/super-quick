import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingCanvasComponent } from './using-canvas.component';

describe('UsingCanvasComponent', () => {
  let component: UsingCanvasComponent;
  let fixture: ComponentFixture<UsingCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsingCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
