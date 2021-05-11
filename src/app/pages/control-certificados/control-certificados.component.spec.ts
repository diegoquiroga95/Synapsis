import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCertificadosComponent } from './control-certificados.component';

describe('ControlCertificadosComponent', () => {
  let component: ControlCertificadosComponent;
  let fixture: ComponentFixture<ControlCertificadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCertificadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCertificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
