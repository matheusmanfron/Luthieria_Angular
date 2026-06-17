import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL da nossa API Node.js
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Envia email e senha para a rota de cadastro da API
  cadastrarUsuario(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, dados);
  }

  // Envia email e senha e espera o Token de volta
  fazerLogin(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dados);
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  // Salva o token no navegador após o login de sucesso
  salvarToken(token: string): void {
    localStorage.setItem('token_api', token);
  }

  // Verifica se o token existe no navegador (para o Guard)
  estaLogado(): boolean {
    return !!localStorage.getItem('token_api');
  }

  // Limpa o token para deslogar
  sair(): void {
    localStorage.removeItem('token_api');
  }
}