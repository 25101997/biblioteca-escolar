import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAddComponent } from './animal-add.component';

describe('AnimalAddComponent', () => {
  let component: AnimalAddComponent;
  let fixture: ComponentFixture<AnimalAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalAddComponent]
    });
    fixture = TestBed.createComponent(AnimalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
