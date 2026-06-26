import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Servico } from '../../models/servico-model';
import { ServicoService } from '../../services/servico-luthier';

@Component({
  selector: 'app-chamados-servicos',
  imports: [CommonModule, RouterLink],
  templateUrl: './chamados-servicos.html',
  styleUrl: './chamados-servicos.css',
})
export class ChamadosServicos implements OnInit {
  private servicoService = inject(ServicoService);

  chamados: Servico[] = [];
  carregando = true;
  mensagemErro = '';

  ngOnInit(): void {
    this.carregarChamados();
  }

  carregarChamados(): void {
    this.servicoService.listarChamadosAbertos().subscribe({
      next: (dados: Servico[]) => {
        this.chamados = dados;
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar chamados.';
        this.carregando = false;
      }
    });
  }

  aceitarChamado(servico: Servico): void {
    this.servicoService.atualizarServico(servico.id, { status: 'aceito' }).subscribe({
      next: () => {
        servico.status = 'aceito';
        alert('Chamado aceito com sucesso!');
      },
      error: () => {
        alert('Erro ao aceitar chamado.');
      }
    });
  }

  iniciarConserto(servico: Servico): void {
    this.servicoService.atualizarServico(servico.id, { status: 'em_andamento' }).subscribe({
      next: () => {
        servico.status = 'em_andamento';
        alert('Conserto iniciado.');
      },
      error: () => {
        alert('Erro ao iniciar conserto.');
      }
    });
  }

  recusarChamado(servico: Servico): void {
    this.servicoService.atualizarServico(servico.id, { status: 'cancelado' }).subscribe({
      next: () => {
        this.chamados = this.chamados.filter(item => item.id !== servico.id);
        alert('Chamado recusado.');
      },
      error: () => {
        alert('Erro ao recusar chamado.');
      }
    });
  }
}