import { Component } from '@angular/core';

// Importar librerias de @angular/core
import { OnInit } from '@angular/core';

// Importar librerias para trabajar con rutas
import { ActivatedRoute, Router } from '@angular/router';

// Importar librerias para trabajar con formularios
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 

// Importar los servicios necesarios
import { AnimalService } from '../../../services/animal/animal.service';
import { AnimalRead, AnimalWrite, AnimalUpdate } from '../../../models/animal.model';
import { AnimalOrigin, AnimalStatus, AnimalStage } from '../../../models/animal.model';

import { LitterService } from '../../../services/litter/litter.service';
import { LitterRead } from '../../../models/litter.model';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-animal-update',
  templateUrl: './animal-update.component.html',
  styleUrls: ['./animal-update.component.scss']
})

export class AnimalUpdateComponent implements OnInit {

  // variables globales del componente
    isEditMode: boolean = false;
    existId: boolean = false;
    
    // datos del animal
    animalForm!: FormGroup;
    animalData: AnimalRead | null = null;
    animalId: number = 0;
    animalStatuses: AnimalStatus[] = [];
    animalOrigins: AnimalOrigin[] = [];
    animalStages: AnimalStage[] = [];
    
  constructor(
      private animalService: AnimalService,
      private litterService: LitterService,
      private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
  ){}

ngOnInit(): void {
  this.initForm();
  this.readIdFromUrl();
}

private initForm(): void {
  this.animalForm = this.formBuilder.group({
    id: [{ value: null, disabled: true }],
    originId: [{ value: 0, disabled: true }, Validators.required],
    litterId: [{ value: null, disabled: true }, Validators.required],
    statusId: [0, Validators.required],
    stageId: [0, Validators.required],
    weight: [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(1000),
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ]],
    sex: ['', Validators.required],
    breed: [null],
    birthDate: ['', Validators.required]
  });
}

  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.animalId = Number(idURL);
      this.getData();
    }
  }  

  private getData(): void {
    if (!this.animalId) return;

    // Estados
    this.animalService.getAllStatuses().subscribe({
      next: (data) => {
        this.animalStatuses = data;
      },
      error: (err) => console.error('Error al cargar estados:', err)
    });

    // Origenes
    this.animalService.getAllOrigins().subscribe({
      next: (data) => {
        this.animalOrigins = data;
      },
      error: (err) => console.error('Error al cargar origines:', err)
    });

    // Estapas
    this.animalService.getAllStages().subscribe({
      next: (data) => {
        this.animalStages = data;
      },
      error: (err) => console.error('Error al cargar estapas:', err)
    });

    // Obtener animal por id
    this.animalService.getById(this.animalId).subscribe({
      next: (data) => {
        this.existId = true;
        this.isEditMode = true;
        this.animalData = data;

        this.animalForm.patchValue({
          id: data.id,
          originId: data.origin?.id ?? 0,
          litterId: data.litter?.id ?? null,
          statusId: data.status?.id ?? 0,
          stageId: data.stage?.id ?? 0,
          weight: data.weight,
          sex: data.sex,
          breed: data.breed,
          birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '',
        });

        this.applyBusinessRules();

      },
      error: () => {
        console.error('No se pudo cargar el animal.');
      }
    });
  }

  private applyBusinessRules(): void {
    if(this.animalData){
      if(this.animalData.origin?.name === 'nacido'){
          this.animalForm.get('sex')?.disable();
          this.animalForm.get('birthDate')?.disable();
      }

      // modificar etapa y estado si el estado es registrado.
      if(!(this.animalData.status?.name === 'registrado')){
        this.animalForm.get('stageId')?.disable();
        this.animalForm.get('statusId')?.disable();
        this.animalForm.get('weight')?.disable();
        this.animalForm.get('breed')?.disable();
        this.animalForm.get('birthDate')?.disable();
      }
    }
  }

  /** Función que se ejecuta cuando se presiona el botón Guardar */
  onSubmit(): void {
    if (this.animalForm.invalid) {
      // Recorremos todos los controles 
      Object.keys(this.animalForm.controls).forEach(key => { 
        const control = this.animalForm.get(key);
        if (control && control.invalid) { 
          console.log(`❌ Control "${key}" inválido:`, control.errors); 
        }  
      });
      this.animalForm.markAllAsTouched(); 
      return; 
    }else{
      this.saveForm();
    }  
  }

  /** Guardar un nuevo animal */
  saveForm(): void {
    if (this.isEditMode && this.existId) {
      const raw = this.animalForm.getRawValue();

      const formData: AnimalUpdate = {
                                      id: Number(this.animalData?.id),
                                      originId: Number(raw.originId),
                                      statusId: Number(raw.statusId),
                                      stageId: Number(raw.stageId),
                                      litterId: raw.litterId,
                                      weight: Number(this.animalForm.value.weight),
                                      sex: raw.sex,
                                      breed: raw.breed,
                                      birthDate: raw.birthDate
                                    };

      if(formData.litterId){
        formData.litterId = Number(raw.litterId)
      }

      this.animalService.update(this.animalId, formData).subscribe(() => {
        console.log('Datos enviados:', formData);
        this.goBack();
      });
      
    }
  }

  /** Navega hacia atrás */
  goBack(): void {
    this.router.navigate(['/livestock/animal-list']);
  }
  
}
