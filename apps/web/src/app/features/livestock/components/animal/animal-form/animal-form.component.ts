import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 

// all about Aninal
import { AnimalService } from '../../../services/animal/animal.service';
import { AnimalRead, AnimalWrite, AnimalUpdate } from '../../../models/animal.model';
import { AnimalOrigin, AnimalStatus, AnimalStage } from '../../../models/animal.model';

// all about Litter
import { LitterService } from '../../../services/litter/litter.service';
import { LitterRead } from '../../../models/litter.model';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})

export class AnimalFormComponent implements OnInit {
  go_back = '/livestock/animal-list';
  isEditMode = false;
  animalId?: number;
  peso: number | null = null;
  pesoControl = new FormControl<number | null>(
    null,
    {
      validators: [
        Validators.min(1),
        Validators.max(1900),
        Validators.pattern(/^\d+(\.\d{1,2})?$/) // permite 0-2 decimales
      ]
    }
  );

  litters: LitterRead[] = [];
  animals: AnimalRead[] = [];
  animalStatuses: AnimalStatus[] = [];
  animalOrigins: AnimalOrigin[] = [];
  animalStages: AnimalStage[] = [];
  animalForm!: FormGroup;
  origen = '';

  // Variables temporales para guardar eventos del formulario
  availableMales: number = 0;
  availableFemales: number = 0;
  bornMales: number = 0;
  bornFemales: number = 0;
  registeredMales: number = 0;
  registeredFemales: number = 0;
  estado = '';
  camadaId = 0;

  // Otras variables
  max_weight = 1900;
  min_weight = 1;

  constructor(
    private animalService: AnimalService,
    private litterService: LitterService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.readIdFromUrl();
    // Aquí enlazas pesoControl al control del formulario
    this.pesoControl = this.animalForm.get('weight') as FormControl;
    
    // Animales
    this.animalService.getAll().subscribe({
      next: (data) => {
        this.animals = data;
      },
      error: (err) => console.error('Error al cargar estados:', err)
    });

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

    // Camadas
    this.litterService.getAll().subscribe({
      next: (data) => {
        this.litters = data;
      },
      error: (err) => console.error('Error al cargar estapas:', err)
    });
   
    console.log(this.animalForm.value.breed);

    this.animalForm.get('litterId')?.valueChanges.subscribe((litterId: number | null) => {
      if (!litterId) return;
      console.log('entro a change de litterId', litterId)
      this.onLitterChange(Number(litterId));
    });

    this.animalForm.get('originId')?.valueChanges.subscribe((originId: number | null) => {
      if (!originId) return;
      originId = Number(originId);

      console.log('entro a change de originId', originId)

      if(originId == 2){
        this.availableMales = 1;
        this.availableFemales = 1;
      }else{
        this.availableMales = 0;
        this.availableFemales = 0;
      }

      this.animalForm.get('sex')?.reset(null);
      this.animalForm.get('litterId')?.reset(null);
    });
  }

  private initForm(): void {
    this.animalForm = this.formBuilder.group({
      id: [null],
      originId: [0, Validators.required],
      litterId: [null],
      statusId: [0, Validators.required],
      stageId: [0, Validators.required],
      weight: [1, [Validators.required, Validators.min(this.min_weight),
                  Validators.max(this.max_weight),
                  Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      sex: ['', Validators.required],
      breed: [null],
      birthDate: ['', Validators.required]
    });
  }

  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.animalId = Number(idURL);
      this.isEditMode = true;
      this.loadAnimal();
    }
  }

/** Cargar datos si estamos editando */
 private loadAnimal(): void {
  if (!this.animalId) return;

  this.animalService.getById(this.animalId).subscribe({
    next: (data) => {

      // Ajustar fecha para el input type="date" (solo yyyy-MM-dd)
      const birth = data.birthDate
        ? data.birthDate.toString().substring(0, 10)
        : '';

      this.animalForm.patchValue({
        id: data.id,
        originId: data.origin?.id ?? 0,
        statusId: data.status?.id ?? 0,
        stageId: data.stage?.id ?? 0,
        litterId: data.litter?.id ?? null,
        weight: data.weight,
        sex: data.sex,        // 'macho' | 'hembra'
        breed: data.breed,
        birthDate: birth
      });

      // Para que las secciones *ngIf dependan del origen
      this.origen = String(data.origin?.id ?? '');
      this.camadaId = Number(data.litter?.id);

      console.log('origen:', this.origen);

      console.log('Form cargado para edición:', this.animalForm.value);
    },
    error: () => {
      console.error('No se pudo cargar el animal.');
    }
  });
}


  /** Guardar un nuevo animal */
  saveAnimal(): void {

    if (this.isEditMode && this.animalId) {

      const formData: AnimalUpdate = {
                                      id: Number(this.animalForm.value.id),
                                      originId: Number(this.animalForm.value.originId),
                                      statusId: Number(this.animalForm.value.statusId),
                                      stageId: Number(this.animalForm.value.stageId),
                                      litterId: this.animalForm.value.litterId,
                                      weight: Number(this.animalForm.value.weight),
                                      sex: this.animalForm.value.sex,
                                      breed: this.animalForm.value.breed,
                                      birthDate: this.animalForm.value.birthDate
                                    };

      if(formData.litterId){
        formData.litterId = Number(formData.litterId)
      }
                                    
      console.log('Update animal: ', formData)

      this.animalService.update(this.animalId, formData).subscribe(() => {
        this.goBack();
      });

    } else {

      const formData: AnimalWrite = {
                                      originId: Number(this.animalForm.value.originId),
                                      statusId: Number(1),
                                      stageId: Number(this.animalForm.value.stageId),
                                      litterId: this.animalForm.value.litterId,
                                      weight: Number(this.animalForm.value.weight),
                                      sex: this.animalForm.value.sex,
                                      breed: this.animalForm.value.breed,
                                      birthDate: this.animalForm.value.birthDate
                                    };

      if(formData.originId == 1){ 
        formData.stageId = 1
      }

      if(formData.litterId){
        formData.litterId = Number(formData.litterId)
      }

      console.log('Create new animal: ', formData)

      this.animalService.create(formData).subscribe(() => {
        this.goBack();
      });
    }

  }

  /** Función que se ejecuta cuando se presiona el botón Guardar */
  onSubmit(): void {
    
    console.log('ingreso a la funcion onSubmit');

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
      this.saveAnimal();
    }
    
  }

  /** Reset del formulario */
  resetForm(): void {
    this.animalForm.reset();
  }

  /** Cancelar y volver atrás */
  cancel(): void {
    this.goBack();
  }

  /** Navega hacia atrás */
  goBack(): void {
    this.router.navigate(['/livestock/animal-list']);
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const char = event.key;
    if (!/^\d$/.test(char)) {
      event.preventDefault(); // bloquea todo lo que no sea dígito
    }
  }

  allowOnlyNumbersMaxMinAndTwoDecimals(event: KeyboardEvent, inputValue: string | number, min: number, max: number) {
    const value = String(inputValue ?? '');
    const char = event.key;

    // Permitir teclas de control
    if (['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(char)) {
      return;
    }

    // Solo dígitos y punto
    if (!/[0-9.]/.test(char)) {
      event.preventDefault();
      return;
    }

    // Evitar más de un punto
    if (char === '.' && value.includes('.')) {
      event.preventDefault();
      return;
    }

    // Máximo dos decimales
    if (value.includes('.')) {
      const [, dec = ''] = value.split('.');
      if (dec.length >= 2) {
        event.preventDefault();
        return;
      }
    }

    // --- Chequeo de rango ---
    // Simulamos cómo quedaría el valor si aceptamos el char
    const newValue = value + char;

    // Si termina en "." no validamos aún (ej: "12.")
    if (newValue.endsWith('.')) return;

    const num = Number(newValue);

    // Si no es número válido, bloqueamos
    if (Number.isNaN(num)) {
      event.preventDefault();
      return;
    }

    // Bloquea si supera el máximo o es menor al mínimo
    if (num > max || num < min) {
      event.preventDefault();
      return;
    }
  }


  validatePasteDecimal(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text') ?? '';
    // solo formato numérico con máx. 2 decimales (permite “.”)
    if (!/^\d+(\.\d{1,2})?$/.test(pasted)) {
      event.preventDefault();
    }
  }

  validatePaste(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text') ?? '';
    if (!/^\d+$/.test(pasted)) {
      event.preventDefault(); // bloquea si lo pegado no son solo números
    }
  }

  // valida al salir del input
  checkRange() {
    if (this.peso !== null) {
      if (this.peso < 1) this.peso = 1;
      if (this.peso > 1900) this.peso = 1900;
    }
  }

  get littersFinalizados() { 
    return this.litters .filter(l => l.status === 'finalizado') 
    .filter(litter => { 
      // Animales registrados con el mismo litterId 
      const registrados = this.animals.filter(a => a.litter?.id === litter.id).length; 
      // Total de nacidos en esa camada 
      const totalNacidos = (litter.bornMale + litter.bornFemale); 
      // Si aún faltan por registrar, retorna true 
      return registrados < totalNacidos; }
    ); 
  }

  onOriginChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    this.origen = selectElement.value;
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
  }

  onLitterChange(litterId: number) {
    const litter = this.littersFinalizados.find(l => l.id === litterId);

    if (!litter) return;

    const malesRegistered = this.animals.filter(
      a => a.litter?.id === litterId && a.sex === 'macho'
    ).length;

    const femalesRegistered = this.animals.filter(
      a => a.litter?.id === litterId && a.sex === 'hembra'
    ).length;

    this.availableMales = litter.bornMale - malesRegistered;
    this.availableFemales = litter.bornFemale - femalesRegistered;
    this.bornMales = litter.bornMale;
    this.bornFemales = litter.bornFemale;
    this.registeredFemales = femalesRegistered;
    this.registeredMales = malesRegistered;

    this.animalForm.get('sex')?.reset(null);

    
    console.log(litter)
    const rawDate = litter.updated; // "2026-02-05 00:54:15.128193+00" 
    const dateObj = new Date(rawDate); 
    const formatted = dateObj.toISOString().split('T')[0]; // "2026-02-05" 
    this.animalForm.get('birthDate')?.setValue(formatted);
  }

}


