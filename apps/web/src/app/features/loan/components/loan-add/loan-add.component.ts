import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { StudentService } from 'src/app/features/student/services/student.service';
import { LoanService } from '../../services/loan.service';
import { BookService } from 'src/app/features/book/services/book.service';

// form imports
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 

// Models
import { StudentRead } from 'src/app/features/student/models/student.model';
import { BookRead } from 'src/app/features/book/models/book.model';

@Component({
  selector: 'app-loan-add',
  templateUrl: './loan-add.component.html',
  styleUrls: ['./loan-add.component.scss']
})

export class LoanAddComponent {
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private bookService: BookService,
    private loanService: LoanService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  form!: FormGroup;
  students: StudentRead[] = [];
  books: BookRead[] = [];

  ngOnInit(): void {

    this.initFrom();

    this.studentService.get().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => console.error('Error al cargar los estudiantes:', err)
    });

    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => console.error('Error al cargar los libros:', err)
    });
  }

  private initFrom(): void {
    this.form = this.formBuilder.group({
      idLector: [null, Validators.required],
      idLibro: [null, Validators.required],
      fechaPrestamo: [null, Validators.required],
      fechaDevolucion: [null],
      devuelto: [null],
    });
  }
  
  onSubmit(): void {
    if (this.form.invalid) {
      console.log('invalid form')
      this.form.markAllAsTouched(); 
      return; 
    }else{
      this.saveForm();
    }
  }

  /** Guardar un nuevo animal */
  saveForm(): void {
    const raw = this.form.getRawValue();

    const payload = {
      idLectorOriginal: Number(raw.idLectorOriginal),
      idLibroOriginal: Number(raw.idLibroOriginal),
      fechaPrestamoOriginal: raw.fechaPrestamoOriginal,
      idLectorNuevo: Number(raw.idLectorNuevo),
      idLibroNuevo: Number(raw.idLibroNuevo),
      fechaPrestamoNueva: raw.fechaPrestamoNueva,
      fechaDevolucion: raw.fechaDevolucion || null,
      devuelto: !!raw.devuelto
    };

    this.loanService.update(payload).subscribe({
      next: (response) => {
        console.log('Préstamo actualizado:', response);
        this.goBack();
      },
      error: (error) => {
        console.error('Error al actualizar préstamo:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/loan/list']);
  }
}