import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { StudentService } from 'src/app/features/student/services/student.service';
import { LoanService } from '../../services/loan.service';
import { BookService } from 'src/app/features/book/services/book.service';

// form imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { StudentRead } from 'src/app/features/student/models/student.model';
import { BookRead } from 'src/app/features/book/models/book.model';
import { PrestamoUpdate } from '../../models/loan.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

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
    this.initForm();

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

    this.route.queryParams.subscribe(params => {
      const fechaPrestamoOriginal = params['fechaPrestamo'] || null;
      const fechaDevolucionOriginal = params['fechaDevolucion'] || null;
      const devuelto = params['devuelto'] === 'true';

      this.form.patchValue({
        idLectorOriginal: Number(params['idLector']),
        idLibroOriginal: Number(params['idLibro']),
        fechaPrestamoOriginal: fechaPrestamoOriginal,

        idLectorNuevo: Number(params['idLector']),
        idLibroNuevo: Number(params['idLibro']),
        fechaPrestamoNueva: this.toDateTimeLocal(fechaPrestamoOriginal),
        fechaDevolucion: fechaDevolucionOriginal
          ? this.toDateTimeLocal(fechaDevolucionOriginal)
          : null,
        devuelto
      });
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      idLectorOriginal: [null, Validators.required],
      idLibroOriginal: [null, Validators.required],
      fechaPrestamoOriginal: [null, Validators.required],

      idLectorNuevo: [null, Validators.required],
      idLibroNuevo: [null, Validators.required],
      fechaPrestamoNueva: [null, Validators.required],

      fechaDevolucion: [null],
      devuelto: [false],
    });
  }

  private toDateTimeLocal(value: string | null): string | null {
    if (!value) return null;
    return value.slice(0, 16);
  }

  private toSqlDateTime(value: string | null): string | null {
    if (!value) return null;
    return value.length === 16 ? `${value}:00` : value;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('invalid form');
      this.form.markAllAsTouched();
      return;
    }

    this.saveForm();
  }

  saveForm(): void {
    const raw = this.form.getRawValue();

    const fechaPrestamoNueva = this.toSqlDateTime(raw.fechaPrestamoNueva);
    const fechaDevolucion = raw.fechaDevolucion
      ? this.toSqlDateTime(raw.fechaDevolucion)
      : null;

    if (raw.devuelto && !fechaDevolucion) {
      console.error('Debes ingresar fecha de devolución si el préstamo está devuelto.');
      return;
    }

    if (!raw.devuelto && fechaDevolucion) {
      console.error('No debes enviar fecha de devolución si el préstamo no está devuelto.');
      return;
    }

    if (fechaPrestamoNueva && fechaDevolucion) {
      const fp = new Date(fechaPrestamoNueva);
      const fd = new Date(fechaDevolucion);

      if (fd < fp) {
        console.error('La fecha de devolución no puede ser menor que la fecha de préstamo.');
        return;
      }
    }

    const payload: PrestamoUpdate = {
      idLectorOriginal: Number(raw.idLectorOriginal),
      idLibroOriginal: Number(raw.idLibroOriginal),
      fechaPrestamoOriginal: raw.fechaPrestamoOriginal,

      idLectorNuevo: Number(raw.idLectorNuevo),
      idLibroNuevo: Number(raw.idLibroNuevo),
      fechaPrestamoNueva: fechaPrestamoNueva ?? '',
      fechaDevolucion: raw.devuelto ? fechaDevolucion : null,
      devuelto: !!raw.devuelto
    };

    console.log(payload);

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