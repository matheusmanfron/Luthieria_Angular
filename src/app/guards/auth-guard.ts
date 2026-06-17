import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Se estiver logado (tiver token), a rota é liberada
    if (this.authService.estaLogado()) {
      return true;
    }
    
    // Se não tiver token, redireciona para o login e bloqueia
    this.router.navigate(['/login']);
    return false;
  }
}