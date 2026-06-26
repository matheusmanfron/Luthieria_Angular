import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(dados: unknown): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

  fazerLogin(dados: unknown): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dados);
  }

  listarUsuarios(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.apiUrl}/usuarios`);
  }

  salvarToken(token: string): void {
    localStorage.setItem('token_api', token);
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('token_api');
  }

  sair(): void {
    localStorage.removeItem('token_api');
  }
}
