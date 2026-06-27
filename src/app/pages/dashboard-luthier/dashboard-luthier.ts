import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Servico } from '../../models/servico-model';
import { ServicoService } from '../../services/servico-luthier';

@Component({
  selector: 'app-dashboard-luthier',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-luthier.html',
  styleUrl: './dashboard-luthier.css',
})
export class DashboardLuthier implements OnInit {
  private servicoService = inject(ServicoService);

  servicos: Servico[] = [];
  mensagemErro = '';

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    this.servicoService.listarServicos().subscribe({
      next: (dados) => {
        this.servicos = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar serviços.';
      }
    });
  }

  get solicitados(): number {
    return this.servicos.filter(s => s.status === 'solicitado').length;
  }

  get emAndamento(): number {
    return this.servicos.filter(s => s.status === 'em_andamento').length;
  }

  get finalizados(): number {
    return this.servicos.filter(s => s.status === 'finalizado').length;
  }

  alterarStatus(servico: Servico, status: Servico['status']): void {
    this.servicoService.atualizarServico(servico.id, { status }).subscribe({
      next: () => {
        servico.status = status;
      },
      error: () => {
        alert('Erro ao atualizar serviço.');
      }
    });
  }
}
