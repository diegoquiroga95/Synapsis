import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmTareasComponent } from './am-tareas.component';

describe('AmTareasComponent', () => {
  let component: AmTareasComponent;
  let fixture: ComponentFixture<AmTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
