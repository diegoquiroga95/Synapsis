import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMAreasComponent } from './am-areas.component';

describe('AMAreasComponent', () => {
  let component: AMAreasComponent;
  let fixture: ComponentFixture<AMAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
