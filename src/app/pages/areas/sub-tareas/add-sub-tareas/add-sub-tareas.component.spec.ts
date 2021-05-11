import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTareasComponent } from './add-sub-tareas.component';

describe('AddSubTareasComponent', () => {
  let component: AddSubTareasComponent;
  let fixture: ComponentFixture<AddSubTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
