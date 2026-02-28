import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LivestockRoutingModule } from './livestock-routing.module';
import { AnimalFormComponent } from './components/animal/animal-form/animal-form.component';
import { AnimalListComponent } from './components/animal/animal-list/animal-list.component';
import { HomeComponent } from './components/home/home/home.component';
import { LitterFormComponent } from './components/litter/litter-form/litter-form.component';
import { LitterListComponent } from './components/litter/litter-list/litter-list.component';
import { FeedFormComponent } from './components/feed/feed-form/feed-form.component';
import { FeedListComponent } from './components/feed/feed-list/feed-list.component';
import { HealthFormComponent } from './components/health/health-form/health-form.component';
import { HealthListComponent } from './components/health/health-list/health-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AnimalUpdateComponent } from './components/animal/animal-update/animal-update.component';
import { AnimalAddComponent } from './components/animal/animal-add/animal-add.component';

@NgModule({
  declarations: [
    AnimalFormComponent,
    AnimalListComponent,
    HomeComponent,
    LitterFormComponent,
    LitterListComponent,
    FeedFormComponent,
    FeedListComponent,
    HealthFormComponent,
    HealthListComponent,
    UserFormComponent,
    UserListComponent,
    AnimalUpdateComponent,
    AnimalAddComponent,
  ],
  imports: [
    CommonModule,
    LivestockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LivestockModule { }
