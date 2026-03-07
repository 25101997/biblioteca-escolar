import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteListComponent } from './estudiante-list.component';

describe('EstudianteListComponent', () => {
  let component: EstudianteListComponent;
  let fixture: ComponentFixture<EstudianteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudianteListComponent]
    });
    fixture = TestBed.createComponent(EstudianteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
