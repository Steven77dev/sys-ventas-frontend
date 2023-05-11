import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionMesasComponent } from './atencion-mesas.component';

describe('AtencionMesasComponent', () => {
  let component: AtencionMesasComponent;
  let fixture: ComponentFixture<AtencionMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionMesasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
