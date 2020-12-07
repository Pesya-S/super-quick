import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildShopTableComponent } from './build-shop-table.component';

describe('BuildShopTableComponent', () => {
  let component: BuildShopTableComponent;
  let fixture: ComponentFixture<BuildShopTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildShopTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildShopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
