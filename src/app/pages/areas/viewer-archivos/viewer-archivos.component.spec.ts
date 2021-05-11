import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerArchivosComponent } from './viewer-archivos.component';

describe('ViewerArchivosComponent', () => {
  let component: ViewerArchivosComponent;
  let fixture: ComponentFixture<ViewerArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerArchivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
