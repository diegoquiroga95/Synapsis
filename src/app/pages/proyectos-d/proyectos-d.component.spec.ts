import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosDComponent } from './proyectos-d.component';

describe('ProyectosDComponent', () => {
  let component: ProyectosDComponent;
  let fixture: ComponentFixture<ProyectosDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
