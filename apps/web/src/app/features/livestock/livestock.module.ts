import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LivestockRoutingModule } from './livestock-routing.module';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { HomeComponent } from './components/home/home/home.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { AnimalAddComponent } from './components/animal/animal-add/animal-add.component';
import { EstudianteAddComponent } from './components/estudiante/estudiante-add/estudiante-add.component';
import { EstudianteListComponent } from './components/estudiante/estudiante-list/estudiante-list.component';
import { EstudianteEditComponent } from './components/estudiante/estudiante-edit/estudiante-edit.component';

@NgModule({
  declarations: [
    AnimalFormComponent,
    AnimalListComponent,
    HomeComponent,
    AnimalUpdateComponent,
    AnimalAddComponent,
    EstudianteAddComponent,
    EstudianteListComponent,
    EstudianteEditComponent,
  ],
  imports: [
    CommonModule,
    LivestockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LivestockModule { }
