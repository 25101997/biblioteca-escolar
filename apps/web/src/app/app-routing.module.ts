import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./features/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'loan',
    loadChildren: () =>
      import('./features/loan/loan.module').then(m => m.LoanModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}