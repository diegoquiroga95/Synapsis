import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfeccionPresupuestoComponent } from './confeccion-presupuesto.component';

describe('ConfeccionPresupuestoComponent', () => {
  let component: ConfeccionPresupuestoComponent;
  let fixture: ComponentFixture<ConfeccionPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfeccionPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfeccionPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
