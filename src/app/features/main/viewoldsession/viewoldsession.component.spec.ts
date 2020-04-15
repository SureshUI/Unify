import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewoldsessionComponent } from './viewoldsession.component';

describe('ViewoldsessionComponent', () => {
  let component: ViewoldsessionComponent;
  let fixture: ComponentFixture<ViewoldsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewoldsessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewoldsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
