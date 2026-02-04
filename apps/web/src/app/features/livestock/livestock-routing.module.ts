import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { LitterListComponent } from './components/litter/litter-list/litter-list.component';
import { LitterFormComponent } from './components/litter/litter-form/litter-form.component';
import { FeedListComponent } from './components/feed/feed-list/feed-list.component';
import { FeedFormComponent } from './components/feed/feed-form/feed-form.component';
import { HealthFormComponent } from './components/health/health-form/health-form.component';
import { HealthListComponent } from './components/health/health-list/health-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'animal-list', component: AnimalListComponent },
  { path: 'animal-add', component: AnimalFormComponent },
  { path: 'animal-add/:id', component: AnimalFormComponent },
  { path: 'litter-list', component: LitterListComponent },
  { path: 'litter-add', component: LitterFormComponent },
  { path: 'litter-edit/:id', component: LitterFormComponent },
  { path: 'feed-list', component: FeedListComponent },
  { path: 'feed-add', component: FeedFormComponent },
  { path: 'health-list', component: HealthListComponent },
  { path: 'health-add', component:  HealthFormComponent},
  { path: 'user-list', component:  UserListComponent},
  { path: 'user-add', component:  UserFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivestockRoutingModule {}
