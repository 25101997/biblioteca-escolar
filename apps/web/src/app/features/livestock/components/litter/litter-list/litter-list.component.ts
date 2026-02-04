import { Component, OnInit } from '@angular/core';
import { LitterService } from '../../../services/litter/litter.service';
import { LitterRead } from '../../../models/litter.model';

@Component({
  selector: 'app-litter-list',
  templateUrl: './litter-list.component.html',
  styleUrls: ['./litter-list.component.scss']
})
export class LitterListComponent implements OnInit {
  data: LitterRead[] = [];
  constructor(private litterService: LitterService) {}

  // ---- SEARCH ----
  searchField: keyof LitterRead = 'id';
  searchValue: string = '';

  // ---- ORDEN ----
  sortColumn: keyof LitterRead = 'id';
  sortAsc = true;

  ngOnInit(): void {
    this.litterService.getAll().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => console.error('Error al cargar estados:', err)
    });
  }

  orderBy(column: keyof LitterRead): void {
    // Si el usuario vuelve a hacer clic en la misma columna, invertimos el orden
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Convertimos a string para comparar de forma segura
      const valA = String(valueA).toLowerCase();
      const valB = String(valueB).toLowerCase();

      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }
}
