import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildShopComponent } from './build-shop.component';

describe('BuildShopComponent', () => {
  let component: BuildShopComponent;
  let fixture: ComponentFixture<BuildShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
