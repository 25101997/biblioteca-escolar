import { Injectable } from '@angular/core';
import { LitterRead, LitterWrite, LitterUpdate } from '../../models/litter.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class LitterService {

  private ip = '192.168.1.196';
  private port = '8080'

  private apiAnimalUrl = `http://${this.ip}:${this.port}/api/Animal`;

  private apiAnimalReproductiveRecordUrl = `http://${this.ip}:${this.port}/api/AnimalReproductiveRecord`;

  constructor(private http: HttpClient) {}

  /** Obtener todos los animales */
  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiAnimalUrl);
  }

  getFinishedLitters(): Observable<LitterRead[]> {
    return this.http.get<LitterRead[]>(this.apiAnimalReproductiveRecordUrl);
  }

  /** Obtener todos los registros de partos*/
  getAll(): Observable<LitterRead[]> {
    return this.http.get<LitterRead[]>(this.apiAnimalReproductiveRecordUrl);
  }

  /** Obtener un registro de parto por id*/
  getById(id: number): Observable<LitterRead> {
    return this.http.get<LitterRead>(`${this.apiAnimalReproductiveRecordUrl}/${id}`);
  }

  create(litter: LitterWrite): Observable<LitterWrite> {
    return this.http.post<LitterWrite>(this.apiAnimalReproductiveRecordUrl, litter);
  }

  update(id: number, litter: LitterUpdate): Observable<LitterWrite> {
    return this.http.put<LitterWrite>(`${this.apiAnimalReproductiveRecordUrl}/${id}`, litter);
  }
}
