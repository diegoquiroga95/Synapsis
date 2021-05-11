import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrMgmtComponent } from './usr-mgmt.component';

describe('UsrMgmtComponent', () => {
  let component: UsrMgmtComponent;
  let fixture: ComponentFixture<UsrMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
