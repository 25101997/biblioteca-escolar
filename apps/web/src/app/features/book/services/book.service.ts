import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { BookRead } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
   private ip = environment.ip;
  private port = environment.port

  private apiUrl = `http://${this.ip}:${this.port}/api/Libros`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<BookRead[]> {
    return this.http.get<BookRead[]>(this.apiUrl);
  }

}