import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoanRoutingModule } from './loan-routing.module';

import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanAddComponent } from './components/loan-add/loan-add.component';
import { LoanTopComponent } from './components/loan-top/loan-top.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    LoanListComponent,
    LoanAddComponent,
    LoanTopComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoanModule { }