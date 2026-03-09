import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTopComponent } from './loan-top.component';

describe('LoanTopComponent', () => {
  let component: LoanTopComponent;
  let fixture: ComponentFixture<LoanTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanTopComponent]
    });
    fixture = TestBed.createComponent(LoanTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
