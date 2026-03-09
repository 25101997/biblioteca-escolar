import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { PrestamoDetalle, 
         PrestamoTop5, 
         PrestamoCreate, 
         PrestamoUpdate } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
   private ip = environment.ip;
  private port = environment.port

  private apiUrl = `http://${this.ip}:${this.port}/api/Prestamos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PrestamoDetalle[]> {
    return this.http.get<PrestamoDetalle[]>(this.apiUrl);
  }

  getTop5(): Observable<PrestamoTop5[]> {
    return this.http.get<PrestamoTop5[]>(`${this.apiUrl}/top5`);
  }

  create(payload: PrestamoCreate): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, payload);
  }

  update(payload: PrestamoUpdate): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.apiUrl, payload);
  }

  delete(idLector: number, idLibro: number, fechaPrestamo: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}?idLector=${idLector}&idLibro=${idLibro}&fechaPrestamo=${encodeURIComponent(fechaPrestamo)}`
    );
  }
}