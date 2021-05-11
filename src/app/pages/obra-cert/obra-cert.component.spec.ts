import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraCertComponent } from './obra-cert.component';

describe('ObraCertComponent', () => {
  let component: ObraCertComponent;
  let fixture: ComponentFixture<ObraCertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraCertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
