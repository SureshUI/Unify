import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastmeditationsComponent } from './pastmeditations.component';

describe('PastmeditationsComponent', () => {
  let component: PastmeditationsComponent;
  let fixture: ComponentFixture<PastmeditationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastmeditationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastmeditationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
