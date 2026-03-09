import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from 'src/app/features/student/services/student.service';
import { LoanService } from '../../services/loan.service';

// form imports
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { StudentRead } from 'src/app/features/student/models/student.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private loanService: LoanService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  form!: FormGroup;
  students: StudentRead[] = [];

  ngOnInit(): void {

    this.initFrom();

    this.studentService.get().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => console.error('Error al cargar los estudiantes:', err)
    });

    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        idLectorOriginal: Number(params['idLector']),
        idLibroOriginal: Number(params['idLibro']),
        fechaPrestamoOriginal: params['fechaPrestamo'],
        idLectorNuevo: Number(params['idLector']),
        idLibroNuevo: Number(params['idLibro']),
        fechaPrestamoNueva: params['fechaPrestamo'],
        fechaDevolucion: params['fechaDevolucion'],
        devuelto: Boolean(params['devuelto'])
      });
    });
  }

  private initFrom(): void {
    this.form = this.formBuilder.group({
      idLectorOriginal: [null, Validators.required],
      idLibroOriginal: [null, Validators.required],
      fechaPrestamoOriginal: [null, Validators.required],
      idLectorNuevo: [null, Validators.required],
      idLibroNuevo: [null, Validators.required],
      fechaPrestamoNueva: [null, Validators.required],
      fechaDevolucion: [null],
      devuelto: [null, Validators.required],
    });
  }

  onSubmit(): void {

  }

  /** Guardar un nuevo animal */
  saveForm(): void {
    
  }

  goBack(): void {
    this.router.navigate(['/loan/list']);
  }
}




