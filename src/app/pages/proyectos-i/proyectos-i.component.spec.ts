import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosIComponent } from './proyectos-i.component';

describe('ProyectosIComponent', () => {
  let component: ProyectosIComponent;
  let fixture: ComponentFixture<ProyectosIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
