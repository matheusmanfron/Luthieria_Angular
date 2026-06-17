import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home }, // Rota inicial (Pública)
  { path: 'login', component: Login }, // (Pública)
  { path: 'cadastro', component: Cadastro }, // (Pública)
  
  // O AuthGuard protege esta rota. Só entra se retornar true!
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] }, 
  
  // Redireciona qualquer URL não mapeada para a Home
  { path: '**', redirectTo: '' } 
];;
