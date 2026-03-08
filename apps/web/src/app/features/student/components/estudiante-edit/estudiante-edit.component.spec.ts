import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteEditComponent } from './estudiante-edit.component';

describe('EstudianteEditComponent', () => {
  let component: EstudianteEditComponent;
  let fixture: ComponentFixture<EstudianteEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudianteEditComponent]
    });
    fixture = TestBed.createComponent(EstudianteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
