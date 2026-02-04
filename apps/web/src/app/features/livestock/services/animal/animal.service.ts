import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../../models/animal.model';
import { AnimalWrite, AnimalUpdate } from '../../models/animal.model';
import { AnimalStatus } from '../../models/animal.model';
import { AnimalOrigin } from '../../models/animal.model';
import { AnimalStage } from '../../models/animal.model';

@Injectable({ providedIn: 'root' })
export class AnimalService {

  private ip = '192.168.1.196';
  private port = '8080'

  private apiUrl = `http://${this.ip}:${this.port}/api/Animal`;

  private apiUrlAnimalStatus = `http://${this.ip}:${this.port}/api/AnimalStatus`;

  private apiUrlAnimalOrigin = `http://${this.ip}:${this.port}/api/AnimalOrigin`;
  
  private apiUrlAnimalStage = `http://${this.ip}:${this.port}/api/AnimalStage`;

  constructor(private http: HttpClient) {}

  /** Obtener todos los estados */
  getAllStatuses(): Observable<AnimalStatus[]> {
      return this.http.get<AnimalStatus[]>(this.apiUrlAnimalStatus);
  }

  /** Obtener todos los origines */
  getAllOrigins(): Observable<AnimalOrigin[]> {
      return this.http.get<AnimalOrigin[]>(this.apiUrlAnimalOrigin);
  }

  /** Obtener todos las etapas */
  getAllStages(): Observable<AnimalStage[]> {
      return this.http.get<AnimalStatus[]>(this.apiUrlAnimalStage);
  }

  /** Obtener todos los animales */
  getAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

  create(animal: AnimalWrite): Observable<AnimalWrite> {
    return this.http.post<AnimalWrite>(this.apiUrl, animal);
  }

  update(id: number, animal: AnimalUpdate): Observable<AnimalUpdate> {
    console.log('Update animal id: ', id, 'where ', animal)
    return this.http.put<AnimalUpdate>(`${this.apiUrl}/${id}`, animal);
  }
}
