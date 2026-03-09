import { Component } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { PrestamoDetalle } from '../../models/loan.model';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {
  loans: PrestamoDetalle[] = [];
  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getAll().subscribe({
      next: (data) => {
        this.loans = data;
      },
      error: (err) => console.error('Error al cargar los estudiantes:', err)
    });
  }
}
