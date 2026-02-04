import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LitterListComponent } from './litter-list.component';

describe('LitterListComponent', () => {
  let component: LitterListComponent;
  let fixture: ComponentFixture<LitterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LitterListComponent]
    });
    fixture = TestBed.createComponent(LitterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});