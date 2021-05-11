import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProyectoComponent } from './nav-proyecto.component';

describe('NavProyectoComponent', () => {
  let component: NavProyectoComponent;
  let fixture: ComponentFixture<NavProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
