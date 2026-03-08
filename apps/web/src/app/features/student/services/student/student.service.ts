import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class StudentService {

  private ip = '192.168.1.196';
  private port = '8080'

  private apiUrl = `http://${this.ip}:${this.port}/api/Animal`;

  private apiUrlAnimalStatus = `http://${this.ip}:${this.port}/api/AnimalStatus`;

  private apiUrlAnimalOrigin = `http://${this.ip}:${this.port}/api/AnimalOrigin`;
  
  private apiUrlAnimalStage = `http://${this.ip}:${this.port}/api/AnimalStage`;

  constructor(private http: HttpClient) {}

  /** Obtener todos los animales */


}
