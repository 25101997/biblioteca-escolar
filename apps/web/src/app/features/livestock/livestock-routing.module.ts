import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { AnimalAddComponent } from './components/animal/animal-add/animal-add.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animal-list', component: AnimalListComponent },
  { path: 'animal-form', component: AnimalFormComponent },
  { path: 'animal-add', component: AnimalAddComponent },
  { path: 'animal-add/:id', component: AnimalFormComponent },
  { path: 'animal-update/:id', component: AnimalUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivestockRoutingModule {}
