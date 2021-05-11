import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerArchivosDocsComponent } from './viewer-archivos-docs.component';

describe('ViewerArchivosDocsComponent', () => {
  let component: ViewerArchivosDocsComponent;
  let fixture: ComponentFixture<ViewerArchivosDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerArchivosDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerArchivosDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
