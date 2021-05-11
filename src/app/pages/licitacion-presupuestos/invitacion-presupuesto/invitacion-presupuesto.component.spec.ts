import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionPresupuestoComponent } from './invitacion-presupuesto.component';

describe('InvitacionPresupuestoComponent', () => {
  let component: InvitacionPresupuestoComponent;
  let fixture: ComponentFixture<InvitacionPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitacionPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitacionPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
