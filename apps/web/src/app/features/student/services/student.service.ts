import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { StudentRead } from '../models/student.model';
import { StudentWrite } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private ip = environment.ip;
  private port = environment.port

  private apiUrl = `http://${this.ip}:${this.port}/api/Estudiantes`;

  constructor(private http: HttpClient) {}

  /** Obtener todos los estudiantes */
  get(): Observable<StudentRead[]> {
    return this.http.get<StudentRead[]>(this.apiUrl);
  }

  create(student: StudentWrite): Observable<StudentWrite> {
    return this.http.post<StudentWrite>(this.apiUrl, student);
  }

  update(id: number, student: StudentRead): Observable<StudentRead> {
    return this.http.put<StudentRead>(`${this.apiUrl}/${id}`, student);
  }

}
