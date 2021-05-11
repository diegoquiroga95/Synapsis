import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionDocumentosComponent } from './generacion-documentos.component';

describe('GeneracionDocumentosComponent', () => {
  let component: GeneracionDocumentosComponent;
  let fixture: ComponentFixture<GeneracionDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneracionDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
