import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmCompaniaPersonaComponent } from './am-compania-persona.component';

describe('AmCompaniaPersonaComponent', () => {
  let component: AmCompaniaPersonaComponent;
  let fixture: ComponentFixture<AmCompaniaPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmCompaniaPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmCompaniaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
