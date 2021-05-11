import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaObraCertComponent } from './lista-obra-cert.component';

describe('ListaObraCertComponent', () => {
  let component: ListaObraCertComponent;
  let fixture: ComponentFixture<ListaObraCertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaObraCertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaObraCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
