import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAddComponent } from './loan-add.component';

describe('LoanAddComponent', () => {
  let component: LoanAddComponent;
  let fixture: ComponentFixture<LoanAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanAddComponent]
    });
    fixture = TestBed.createComponent(LoanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
