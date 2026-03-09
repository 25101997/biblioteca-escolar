import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteListComponent } from './components/estudiante-list/estudiante-list.component';
import { EstudianteAddComponent } from './components/estudiante-add/estudiante-add.component';
import { EstudianteEditComponent } from './components/estudiante-edit/estudiante-edit.component';

const routes: Routes = [
  { path: 'list', component: EstudianteListComponent },
  { path: 'add', component: EstudianteAddComponent },
  { path: 'edit/:id', component: EstudianteAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
