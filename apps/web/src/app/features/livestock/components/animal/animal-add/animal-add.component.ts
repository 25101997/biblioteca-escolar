import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

// all about Aninal
import { AnimalService } from '../../../services/animal/animal.service';
import { AnimalRead, AnimalWrite } from '../../../models/animal.model';
import { AnimalOrigin, AnimalStatus, AnimalStage } from '../../../models/animal.model';

// all about Litter
import { LitterService } from '../../../services/litter/litter.service';
import { LitterRead } from '../../../models/litter.model';

// form
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 

@Component({
  selector: 'app-animal-add',
  templateUrl: './animal-add.component.html',
  styleUrls: ['./animal-add.component.scss']
})
export class AnimalAddComponent implements OnInit {

  constructor(
      private animalService: AnimalService,
      private litterService: LitterService,
      private formBuilder: FormBuilder,
  ) {}

  litters: LitterRead[] = [];
  littersAvailableToRegister: LitterRead[] = [];
  animals: AnimalRead[] = [];
  animalStatuses: AnimalStatus[] = [];
  animalOrigins: AnimalOrigin[] = [];
  animalStages: AnimalStage[] = [];
  animalForm!: FormGroup;

  // variables para mostrar campos en el html
  showLitterIdField: Boolean = false;
  showBirthdayField: Boolean = false;
  showStageField: Boolean = false;
  showSexField: Boolean = false;
  showWeightField: Boolean = false;
  showBreedField: Boolean = false;

  // Variables para validar si un cerdo nacido ya fue registrado
  availableMales: number = 0;
  availableFemales: number = 0;
  bornMales: number = 0;
  bornFemales: number = 0;
  registeredMales: number = 0;
  registeredFemales: number = 0;

  // Variables para permitir solo numero en el campo peso
  previousWeight: number | null = null;

  // variable para fecha
  todayString = new Date().toLocaleDateString('en-CA'); // hora local de la pc
  //todayString = new Date().toISOString().split('T')[0]; // hora internacional
  minDateString = new Date(new Date().setFullYear(new Date().getFullYear() - 25)).toISOString().split('T')[0];

  // Inicio de programa
  ngOnInit(){
    this.initFrom();
    this.loadDataFromService();
    
    // Si el campo origin id cambia
    this.animalForm.get('originId')?.valueChanges.subscribe((originId: number | null) => {
      this.onOriginChange(Number(originId));
    });

    // Si el campo litter id cambia
    this.animalForm.get('litterId')?.valueChanges.subscribe((litterId: number | null) => {
      this.onLitterChange(Number(litterId));
    });

    // Si el campo peso cambia
    this.animalForm.get('weight')?.valueChanges.subscribe((weight: number | null) => {
      if (!weight) {
        this.previousWeight = null;
        this.animalForm.get('weight')?.reset(null, { emitEvent: false });
        return;
      }
      this.onWeightChange(Number(weight));
    });
  }

  private loadDataFromService(): void {
    forkJoin({  animals: this.animalService.getAll(), 
                statuses: this.animalService.getAllStatuses(), 
                origins: this.animalService.getAllOrigins(), 
                stages: this.animalService.getAllStages(), 
                litters: this.litterService.getAll() 
    }).subscribe({ 
      next:(data) => { 
                this.animals = data.animals; 
                this.animalStatuses = data.statuses; 
                this.animalOrigins = data.origins; 
                this.animalStages = data.stages; 
                this.litters = data.litters; 
      },error:(err) => console.error('Error al cargar datos:', err)
    });
  }

  private initFrom(): void {
    this.animalForm = this.formBuilder.group({
      id: [null],
      originId: [0, Validators.required],
      litterId: [null],
      statusId: [0, Validators.required],
      stageId: [0, Validators.required],
      weight: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]],
      sex: ['', Validators.required],
      breed: [null],
      birthDate: [null, [Validators.required, this.noFutureDateValidator()]]
    });
  }

  onOriginChange(originId: number) {
    // Resetear campos comunes
    this.showLitterIdField = false;
    this.showBirthdayField = false;
    this.showStageField = false;
    this.showSexField = false;
    this.showWeightField = false;
    this.showBreedField = false;

    if (originId === 1) {
      // origin === nacido
      this.filterLitters();
      this.showLitterIdField = true;
    } else if (originId === 2) {
      // origin === comprado
      this.animalForm.get('litterId')?.reset(null);
      this.showBirthdayField = true;
      this.showStageField = true;
      this.showSexField = true;
      this.availableMales = 1;
      this.availableFemales = 1;
      this.showWeightField = true;
      this.showBreedField = true;
    }
  }

  private filterLitters(): void {
    this.littersAvailableToRegister = this.litters
      .filter(l => l.status === 'finalizado')
        .filter(litter => {
          // Animales registrados con el mismo litterId
          const registrados = this.animals.filter(a => a.litter?.id === litter.id).length;
          // Total de nacidos en esa camada 
          const totalNacidos = (litter.bornMale + litter.bornFemale);
          // Si aún faltan por registrar, retorna true 
          return registrados < totalNacidos;
        }
    );
  }

  onLitterChange(litterId: number) {

    const litter = this.litters.find(l => l.id === litterId);

    if (!litter){
      this.showSexField = false;
      this.showWeightField = false;
      this.showBreedField = false;
      return;
    } 

    // origin === nacido
    this.showSexField = true;
    this.showWeightField = true;
    this.showBreedField = true;
    

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
    
    const rawDate = litter.updated; // "2026-02-05 00:54:15.128193+00" 
    const dateObj = new Date(rawDate); 
    const formatted = dateObj.toISOString().split('T')[0]; // "2026-02-05" 
    this.animalForm.get('birthDate')?.setValue(formatted);
  }

  onWeightChange(weight: number) {
    if(!(weight >= 1 && weight <= 1200)){
      this.animalForm.get('weight')?.setValue(this.previousWeight);
    }else{
      this.previousWeight = weight;
    }
  }

  onlyNumbers(event: KeyboardEvent): void { 
    const input = event.target as HTMLInputElement; 
    const char = event.key; 

    //const nextValue = currentValue + char; 
    const start = input.selectionStart ?? input.value.length; const end = input.selectionEnd ?? input.value.length;
    const nextValue = input.value.substring(0, start) + char + input.value.substring(end);
    
    /*
    if(Number(nextValue) < 1 || Number(nextValue) > 1200){
      event.preventDefault();
    }*/

    // Permitir teclas de control (Backspace, Tab, flechas, etc.) 
    if ( event.key === 'Backspace' || 
         event.key === 'Tab' || 
         event.key.startsWith('Arrow') || 
         event.key === 'Delete' ){ 
      return; 
    }

    // Validar con regex: número entero o decimal 
    // con máximo un punto y hasta 2 decimales 
    const regex = /^\d+(\.\d{0,2})?$/;

    if (!regex.test(nextValue)){ 
      event.preventDefault();
    } 
  }

  noFutureDateValidator() {
    // minBirthDate = new Date(new Date().setFullYear(new Date().getFullYear() - 120));
    // maxBirthDate = new Date(); // hoy

    return (control: AbstractControl) => {
      if (!control.value) return null;

      const selected = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selected > today ? { futureDate: true } : null;
    };
  }

}