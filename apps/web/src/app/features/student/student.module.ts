import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';

import { EstudianteAddComponent } from './components/estudiante-add/estudiante-add.component';
import { EstudianteListComponent } from './components/estudiante-list/estudiante-list.component';
import { EstudianteEditComponent } from './components/estudiante-edit/estudiante-edit.component';

@NgModule({
  declarations: [
    EstudianteAddComponent,
    EstudianteListComponent,
    EstudianteEditComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StudentModule { }
