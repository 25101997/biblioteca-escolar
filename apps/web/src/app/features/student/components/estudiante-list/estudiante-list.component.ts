import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentRead } from '../../models/student.model';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.scss']
})
export class EstudianteListComponent {
  students: StudentRead[] = [];
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.get().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => console.error('Error al cargar los estudiantes:', err)
    });
  }
}
