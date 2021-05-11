import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTareasComponent } from './sub-tareas.component';

describe('SubTareasComponent', () => {
  let component: SubTareasComponent;
  let fixture: ComponentFixture<SubTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
