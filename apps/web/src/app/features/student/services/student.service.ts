import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { StudentRead } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private ip = environment.ip;
  private port = environment.port

  private apiUrl = `http://${this.ip}:${this.port}/api/Estudiantes`;

  constructor(private http: HttpClient) {}

  /** Obtener todos los estudiantes */
  getAllStudents(): Observable<StudentRead[]> {
    return this.http.get<StudentRead[]>(this.apiUrl);
  }

}
