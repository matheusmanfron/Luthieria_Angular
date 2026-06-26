import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Dashboard } from './pages/dashboard/dashboard';
import { Catalogo } from './pages/catalogo/catalogo';
import { CadastrarInstrumento } from './pages/cadastrar-instrumento/cadastrar-instrumento';
import { SolicitarConserto } from './pages/solicitar-conserto/solicitar-conserto';
import { MeusAnuncios } from './pages/meus-anuncios/meus-anuncios';
import { MeusServicos } from './pages/meus-servicos/meus-servicos';
import { DashboardLuthier } from './pages/dashboard-luthier/dashboard-luthier';
import { InstrumentoDetalhes } from './pages/instrumento-detalhes/instrumento-detalhes';

import { Carrinho } from './pages/carrinho/carrinho';
import { SolicitarTroca } from './pages/solicitar-troca/solicitar-troca';
import { ChamadosServicos } from './pages/chamados-servicos/chamados-servicos';
import { RegistrarConserto } from './pages/registrar-conserto/registrar-conserto';
import { RelatorioPecas } from './pages/relatorio-pecas/relatorio-pecas';

import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },

  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },

  { path: 'catalogo', component: Catalogo, canActivate: [AuthGuard] },
  { path: 'carrinho', component: Carrinho, canActivate: [AuthGuard] },

  { path: 'instrumentos/novo', component: CadastrarInstrumento, canActivate: [AuthGuard] },
  { path: 'instrumentos/:id', component: InstrumentoDetalhes, canActivate: [AuthGuard] },

  { path: 'conserto/solicitar', component: SolicitarConserto, canActivate: [AuthGuard] },
  { path: 'troca/solicitar', component: SolicitarTroca, canActivate: [AuthGuard] },

  { path: 'meus-anuncios', component: MeusAnuncios, canActivate: [AuthGuard] },
  { path: 'meus-servicos', component: MeusServicos, canActivate: [AuthGuard] },

  { path: 'dashboard-luthier', component: DashboardLuthier, canActivate: [AuthGuard] },
  { path: 'luthier/chamados', component: ChamadosServicos, canActivate: [AuthGuard] },
  { path: 'luthier/registrar-conserto', component: RegistrarConserto, canActivate: [AuthGuard] },
  { path: 'luthier/relatorio-pecas', component: RelatorioPecas, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];