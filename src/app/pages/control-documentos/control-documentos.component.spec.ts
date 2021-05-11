import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDocumentosComponent } from './control-documentos.component';

describe('ControlDocumentosComponent', () => {
  let component: ControlDocumentosComponent;
  let fixture: ComponentFixture<ControlDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
