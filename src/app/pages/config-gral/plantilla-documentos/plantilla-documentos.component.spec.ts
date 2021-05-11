import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDocumentosComponent } from './plantilla-documentos.component';

describe('PlantillaDocumentosComponent', () => {
  let component: PlantillaDocumentosComponent;
  let fixture: ComponentFixture<PlantillaDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
