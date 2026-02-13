import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AnimalService } from '../../../services/animal/animal.service';
import { LitterService } from '../../../services/litter/litter.service';
import { AnimalRead } from '../../../models/animal.model';
import { AnimalUpdate } from '../../../models/animal.model';
import { AnimalStage } from '../../../models/animal.model';
import { LitterRead, LitterWrite, LitterUpdate } from '../../../models/litter.model';

@Component({
  selector: 'app-litter-form',
  templateUrl: './litter-form.component.html',
  styleUrls: ['./litter-form.component.scss']
})

export class LitterFormComponent {
  litterForm!: FormGroup;
  isEditMode = false;
  litterId: number | null = null;
  animalStages: AnimalStage[] = [];
  motherSelect? : AnimalRead;
  animals: AnimalRead[] = [];
  hembras: AnimalRead[] = []; 
  machos: AnimalRead[] = [];
  statuses: string[] = ['registrado','fecundado','no fecundado','abortado', 'finalizado'];

  // Variables temporales selecionadas
  estadoSelecionado = '';
  max_born = 30;
  min_born = 0;
  previous_digit = 0;
  
  // 
  isFinished: boolean = true;
  isAborted: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private fb: FormBuilder,
    private router: Router,
    private litterService: LitterService
  ) {}


  ngOnInit(): void {
    this.initForm();
    this.readIdFromUrl();

    if(!this.isEditMode){
      this.animalService.getAll().subscribe({
        next: (datas) => {
          

          for (const data of datas) {
          
            const edad = Math.floor((new Date().getTime() - new Date(data.birthDate).getTime()) / (1000 * 60 * 60 * 24));        
          
              const enEtapa = data.stage?.name.toLowerCase() === 'reproduccion'
              
              if (edad >= 80 && enEtapa){
                const sexo = data.sex.toLowerCase()
                if ( sexo === 'hembra'){
                  this.hembras.push(data);
                } else if ( sexo === 'macho'){
                  this.machos.push(data);
                }
              }  
            
          }
        },
        error: (err) => console.error('Error al cargar padres:', err)
      });
    }

  }

  /** Inicializa el formulario reactivo */
  private initForm(): void {
    this.litterForm = this.fb.group({
      id: [null],
      madreId: [null, Validators.required],
      padreId: [null],
      bornAliveFemales: [0, [Validators.required, Validators.min(this.min_born), Validators.max(this.max_born)]],
      bornAliveMales: [0, [Validators.required, Validators.min(this.min_born), Validators.max(this.max_born)]],
      stillbornMales: [0, [Validators.required, Validators.min(this.min_born), Validators.max(this.max_born)]],
      stillbornFemales: [0, [Validators.required, Validators.min(this.min_born), Validators.max(this.max_born)]],
      status: ['registrado',Validators.required],
      notes: [null]
    });
  }

  /** Lee el parámetro ":id" de la URL */
  private readIdFromUrl(): void {
    const idURL = this.route.snapshot.paramMap.get('id');
    if (idURL) {
      this.litterId = Number(idURL);
      this.isEditMode = true;
      this.loadLitter();
    }
  }

  /** Cargar datos si estamos editando */
  private loadLitter(): void {
    if (!this.litterId) return;

    this.litterService.getById(this.litterId).subscribe({
      next: (data) => {
        this.hembras.push(data.mother as AnimalRead)
        this.machos.push(data.father as AnimalRead)

        this.litterForm.patchValue({
          id: data.id,
          madreId: data.mother?.id,
          padreId: data.father?.id,
          bornAliveMales: data.bornMale,
          bornAliveFemales: data.bornFemale,
          stillbornMales: data.abortedMale,
          stillbornFemales: data.abortedFemale,
          status: data.status,
          notes: data.notes
        });

        if (data.status === 'finalizado' || data.status === 'abortado') {
          this.litterForm.get('bornAliveMales')?.disable();
          this.litterForm.get('bornAliveFemales')?.disable();
          this.litterForm.get('stillbornMales')?.disable();
          this.litterForm.get('stillbornFemales')?.disable();
          this.litterForm.get('status')?.disable();
        }

        if (data.status === 'finalizado') { 
          this.isFinished = true;
        }else if(data.status === 'abortado') {
          this.isAborted = true;
        }

      },
      error: () => {
        console.error('No se pudo cargar la camada.');
      }
    });
  }

  /** Guardar una nueva camada o actualizar */
  saveLitter(): void {

    const raw = this.litterForm.getRawValue();

    const formData: LitterUpdate = {
      id: raw.id,
      motherId: Number(raw.madreId),
      fatherId: Number(raw.padreId),
      bornMale: Number(raw.bornAliveMales),
      bornFemale: Number(raw.bornAliveFemales),
      abortedMale: Number(raw.stillbornMales),
      abortedFemale: Number(raw.stillbornFemales),
      status: raw.status,
      notes: raw.notes
    };

    console.log('Payload limpio:', formData);

    if (this.isEditMode && this.litterId) {
      this.litterService.update(this.litterId, formData).subscribe(() => {
        this.goBack();
      });
    } else {

      // Buscar que es estado gestacion exista
      this.animalService.getAllStages().subscribe({
        next: (stages) => {
          
          for(const stage of stages){
            if(stage.name.toLocaleLowerCase()=== 'gestacion'){
              this.animalService.getById(Number(this.litterForm.value.madreId)).subscribe({
                  next: (madre: AnimalRead) => {
                    const motherUpdated: AnimalUpdate = {
                      id: Number(madre.id),
                      originId: Number(madre.origin?.id),
                      statusId: Number(madre.status?.id),
                      stageId: stage.id,
                      sex: madre.sex,
                      weight: madre.weight,
                      breed: madre.breed,
                      birthDate: madre.birthDate
                    };
                    this.litterService.create(formData).subscribe(() => {
                      this.animalService.update(madre.id, motherUpdated).subscribe(() => {
                        this.goBack();
                      });
                    });
                  },
                  error: (err) => {
                    console.error('Error al obtener madre por id:', err);
                  }
              });
            }
          }
        },
        error: (err) => console.error('Error al cargar etapas del animal:', err)
      });
    }

  }

  /** Función que se ejecuta cuando se presiona el botón Guardar */
  onSubmit(): void {
    if (this.litterForm.invalid) {
      // Recorremos todos los controles 
      Object.keys(this.litterForm.controls).forEach(key => { 
        const control = this.litterForm.get(key);
        if (control && control.invalid) { 
          console.log(`❌ Control "${key}" inválido:`, control.errors); 
        }  
      });
      this.litterForm.markAllAsTouched();
      return;
    }
    this.saveLitter();
  }

  /** Reset del formulario */
  resetForm(): void {
    this.litterForm.reset();
  }

  /** Cancelar y volver atrás */
  cancel(): void {
    this.goBack();
  }

  /** Navega hacia atrás */
  goBack(): void {
    this.router.navigate(['/livestock/litter-list']);
  }

  OnlyDigit(event: KeyboardEvent) { 
    const input = event.target as HTMLInputElement; 
    const char = event.key; 

    // Permitir teclas de control 
    if (['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(char)) { return; }

    // Examina que char sea un digito.
    if (!/[0-9]/.test(char)) { event.preventDefault(); return; }

    this.previous_digit = Number(input.value);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; 
    const value = Number(inputElement.value);
    const max = Number(inputElement.getAttribute('max'));
    const min = Number(inputElement.getAttribute('min'));

    if(value > max || value < min){
      inputElement.value = String(this.previous_digit);
    }else{
      inputElement.value = String(value);
    }
    
  }

  sumatoria(event: Event): void { 
    const inputElement = event.target as HTMLInputElement; 
    const value = Number(inputElement.value);

    const controlName = inputElement.getAttribute('formcontrolname');
    
    const a = Number(this.litterForm.get('bornAliveFemales')?.value)
    const b = Number(this.litterForm.get('bornAliveMales')?.value)
    const c = Number(this.litterForm.get('stillbornFemales')?.value)
    const d = Number(this.litterForm.get('stillbornMales')?.value)

    const sumatoria = (a + b + c + d);
    
    if(sumatoria > this.max_born){
      this.litterForm.get(String(controlName))?.setValue(this.previous_digit)
    }else{
      this.litterForm.get(String(controlName))?.setValue(value)
    }

  }

}


