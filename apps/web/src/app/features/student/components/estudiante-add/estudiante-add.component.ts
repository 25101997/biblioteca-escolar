import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';

import { ActivatedRoute, Router } from '@angular/router';

// form imports
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 

@Component({
  selector: 'app-estudiante-add',
  templateUrl: './estudiante-add.component.html',
  styleUrls: ['./estudiante-add.component.scss']
})
export class EstudianteAddComponent {

  constructor(
      private studentService: StudentService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
  ) {}

  isEditMode = false;
  studentId: number | null = null;
  studentForm!: FormGroup;

  // Inicio de programa
  ngOnInit(){
    this.initFrom();
    this.readIdFromUrl();
  }

  private initFrom(): void {
    this.studentForm = this.formBuilder.group({
      id: [null],
      ci: [null, Validators.required],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      carrera: [null, Validators.required],
      edad: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
      ]],
    });
  }

  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.studentId = Number(idURL);
      this.isEditMode = true;
      this.loadDataToForm();
    }
  }

  /** Cargar datos si estamos editando */
  private loadDataToForm(): void {
    if (!this.studentId) return;

    this.studentService.get().subscribe({
      next: (data) => {
        const registro = data.find((item: any) => item.idLector === this.studentId);
        if (registro) {
          this.studentForm.patchValue({
            id: registro.idLector,
            ci: registro.ci,
            nombre: registro.nombre,
            direccion: registro.direccion,
            carrera: registro.carrera,
            edad: registro.edad
          });
        }
      },
      error: () => {
        console.error('No se pudo cargar el animal.');
      }
    });

  }

  onlyNumbers(event: KeyboardEvent): void { 
    const input = event.target as HTMLInputElement; 
    const char = event.key; 

    //const nextValue = currentValue + char; 
    const start = input.selectionStart ?? input.value.length; const end = input.selectionEnd ?? input.value.length;
    const nextValue = input.value.substring(0, start) + char + input.value.substring(end);
    
    // Permitir teclas de control (Backspace, Tab, flechas, etc.) 
    if ( event.key === 'Backspace' || 
         event.key === 'Tab' || 
         event.key.startsWith('Arrow') || 
         event.key === 'Delete' ){ 
      return; 
    }

    // Validar con regex: número entero o decimal 
    // con máximo un punto y hasta 2 decimales 
    const regex = /^\d+$/;

    if (!regex.test(nextValue)){ 
      event.preventDefault();
    } 
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      console.log('invalid form')
      this.studentForm.markAllAsTouched(); 
      return; 
    }else{
      this.saveForm();
    }
  }

  /** Guardar un nuevo animal */
  saveForm(): void {
    const raw = this.studentForm.getRawValue();

    const formData: any = {
      ci: raw.ci,
      nombre: raw.nombre,
      direccion: raw.direccion,
      carrera: raw.carrera,
      edad: Number(raw.edad)
    };

    if (this.isEditMode && this.studentId) {
      formData.idLector = raw.id;

      this.studentService.update(this.studentId, formData).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error al actualizar:', err)
      });

    } else {
      this.studentService.create(formData).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/student/list']);
  }

}
