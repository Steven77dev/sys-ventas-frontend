import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadreCajaComponent } from './cuadre-caja.component';

describe('CuadreCajaComponent', () => {
  let component: CuadreCajaComponent;
  let fixture: ComponentFixture<CuadreCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadreCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadreCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
