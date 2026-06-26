import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
import { Catalogo } from './pages/catalogo/catalogo';
import { CadastrarInstrumento } from './pages/cadastrar-instrumento/cadastrar-instrumento';
import { SolicitarConserto } from './pages/solicitar-conserto/solicitar-conserto';
import { MeusAnuncios } from './pages/meus-anuncios/meus-anuncios';
import { MeusServicos } from './pages/meus-servicos/meus-servicos';
import { DashboardLuthier } from './pages/dashboard-luthier/dashboard-luthier';
import { Carrinho } from './pages/carrinho/carrinho';
import { SolicitarTroca } from './pages/solicitar-troca/solicitar-troca';
import { ChamadosServicos } from './pages/chamados-servicos/chamados-servicos';
import { RegistrarConserto } from './pages/registrar-conserto/registrar-conserto';
import { RelatorioPecas } from './pages/relatorio-pecas/relatorio-pecas';


export const routes: Routes = [
  { path: '', component: Home }, // Rota inicial (Pública)
  { path: 'login', component: Login }, // (Pública)
  { path: 'cadastro', component: Cadastro }, // (Pública)


  { path: 'catalogo', component: Catalogo, canActivate: [AuthGuard] },
  { path: 'instrumentos/novo', component: CadastrarInstrumento, canActivate: [AuthGuard] },
  { path: 'conserto/solicitar', component: SolicitarConserto, canActivate: [AuthGuard] },
  { path: 'meus-anuncios', component: MeusAnuncios, canActivate: [AuthGuard] },
  { path: 'meus-servicos', component: MeusServicos, canActivate: [AuthGuard] },
  
  { path: 'carrinho', component: Carrinho, canActivate: [AuthGuard] },

  { path: 'carrinho', component: Carrinho, canActivate: [AuthGuard] },
{ path: 'troca/solicitar', component: SolicitarTroca, canActivate: [AuthGuard] },
{ path: 'luthier/chamados', component: ChamadosServicos, canActivate: [AuthGuard] },
{ path: 'luthier/registrar-conserto', component: RegistrarConserto, canActivate: [AuthGuard] },
{ path: 'luthier/relatorio-pecas', component: RelatorioPecas, canActivate: [AuthGuard] },

  // O AuthGuard protege esta rota. Só entra se retornar true!
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'dashboard-luthier', component: DashboardLuthier, canActivate: [AuthGuard] }, 
  
  // Redireciona qualquer URL não mapeada para a Home
  { path: '**', redirectTo: '' } 
];;
