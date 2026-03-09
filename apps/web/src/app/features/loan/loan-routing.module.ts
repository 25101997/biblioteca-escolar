import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanAddComponent } from './components/loan-add/loan-add.component';
import { LoanTopComponent } from './components/loan-top/loan-top.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: 'list', component: LoanListComponent },
  { path: 'add', component: LoanAddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'top', component: LoanTopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule {}