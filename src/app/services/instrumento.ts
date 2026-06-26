import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Instrumento } from '../models/instrumento-model';

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {
  private apiUrl = 'http://localhost:3000/instrumentos';

  constructor(private http: HttpClient) {}

  listarInstrumentos(): Observable<Instrumento[]> {
    return this.http.get<Instrumento[]>(this.apiUrl);
  }

  buscarInstrumentoPorId(id: number): Observable<Instrumento> {
    return this.http.get<Instrumento>(`${this.apiUrl}/${id}`);
  }

  cadastrarInstrumento(instrumento: Instrumento): Observable<Instrumento> {
    return this.http.post<Instrumento>(this.apiUrl, instrumento);
  }
}
