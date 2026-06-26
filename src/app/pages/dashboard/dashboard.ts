import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';
import { InstrumentoService } from '../../services/instrumento';
import { ServicoService } from '../../services/servico-luthier';

import { Instrumento } from '../../models/instrumento-model';
import { Servico } from '../../models/servico-model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private instrumentoService = inject(InstrumentoService);
  private servicoService = inject(ServicoService);
  private router = inject(Router);

  instrumentos: Instrumento[] = [];
  servicos: Servico[] = [];

  usuarioLogadoId = 1;
  mensagemErro = '';
  carregando = true;

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.instrumentoService.listarInstrumentos().subscribe({
      next: (instrumentos) => {
        this.instrumentos = instrumentos;
        this.carregarServicos();
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar instrumentos.';
        this.carregando = false;
      }
    });
  }

  carregarServicos(): void {
    this.servicoService.listarServicos().subscribe({
      next: (servicos) => {
        this.servicos = servicos;
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar serviÃ§os.';
        this.carregando = false;
      }
    });
  }

  get meusAnuncios(): Instrumento[] {
    return this.instrumentos.filter(instrumento => instrumento.donoId === this.usuarioLogadoId);
  }

  get meusServicos(): Servico[] {
    return this.servicos.filter(servico => servico.clienteId === this.usuarioLogadoId);
  }

  get servicosEmAndamento(): number {
    return this.meusServicos.filter(servico => servico.status === 'em_andamento').length;
  }

  get anunciosComTroca(): number {
    return this.meusAnuncios.filter(instrumento => instrumento.aceitaTroca).length;
  }

  fazerLogout(): void {
    this.authService.sair();
    this.router.navigate(['/login']);
  }
}
