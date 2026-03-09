import { Component } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { PrestamoTop5 } from '../../models/loan.model';

@Component({
  selector: 'app-loan-top',
  templateUrl: './loan-top.component.html',
  styleUrls: ['./loan-top.component.scss']
})
export class LoanTopComponent {
  loans: PrestamoTop5[] = [];
  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getTop5().subscribe({
      next: (data) => {
        this.loans = data;
      },
      error: (err) => console.error('Error al cargar los estudiantes:', err)
    });
  }
}
