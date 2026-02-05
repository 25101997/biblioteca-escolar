import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../services/animal/animal.service';
import { AnimalRead } from '../../../models/animal.model';

type SearchField = keyof AnimalRead | 'edadDias'; // agregamos el campo virtual de edad

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  go_back = '/livestock/'
  animals: AnimalRead[] = [];
  filteredAnimals: AnimalRead[] = [];

  // ---- BÚSQUEDA ----
  searchField: SearchField = 'id';
  searchTerm: string = '';

  // ---- ORDEN ----
  sortColumn: keyof AnimalRead = 'id';
  sortAsc = true;

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.animalService.getAll().subscribe({
      next: (data) => {
        this.animals = data;
        this.applyFilters();
      },
      error: (err) => console.error('Error al cargar animales:', err)
    });
  }

  // Dispara la búsqueda manual (botón o Enter)
  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();

    // 1) Filtrar según el campo seleccionado
    let data = this.animals.filter(a => {
      if (!term) return true; // sin término => no filtra

      const value = this.getComparableValue(a, this.searchField);

      if (value === null || value === undefined) return false;

      if (typeof value === 'number') {
        // Para números comparamos por igualdad exacta (ej: id=5, edadDias=40).
        // Si prefieres “mayor/menor o igual”, puedes parsear operadores aquí.
        const n = Number(term);
        if (Number.isNaN(n)) return false;
        return value === n;
      }

      // Strings: búsqueda contains, case-insensitive
      return String(value).toLowerCase().includes(term);
    });

    // 2) Ordenar (usa tu lógica existente)
    data = data.sort((a, b) => {
      const valA = a[this.sortColumn] as any;
      const valB = b[this.sortColumn] as any;
      if (valA == null && valB == null) return 0;
      if (valA == null) return this.sortAsc ? -1 : 1;
      if (valB == null) return this.sortAsc ? 1 : -1;

      if (valA > valB) return this.sortAsc ? 1 : -1;
      if (valA < valB) return this.sortAsc ? -1 : 1;
      return 0;
    });

    this.filteredAnimals = data;
  }

  // Obtiene el valor “buscable” del Animal según el campo elegido
  private getComparableValue(a: AnimalRead, field: SearchField): string | number | null {
    switch (field) {
      case 'edadDias':
        return this.getAgeInDays(a.birthDate);
      default:
        // Para campos reales del modelo (id, sexo, estado, etc.)
        return (a as any)[field] ?? null;
    }
  }

  sortBy(column: keyof AnimalRead) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.applyFilters();
  }

  getAgeInDays(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    const diff = today.getTime() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}
