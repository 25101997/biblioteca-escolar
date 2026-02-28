import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalUpdateComponent } from './animal-update.component';

describe('AnimalUpdateComponent', () => {
  let component: AnimalUpdateComponent;
  let fixture: ComponentFixture<AnimalUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalUpdateComponent]
    });
    fixture = TestBed.createComponent(AnimalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
