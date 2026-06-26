import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Servico } from '../../models/servico-model';
import { ServicoService } from '../../services/servico-luthier';

@Component({
  selector: 'app-meus-servicos',
  imports: [CommonModule, RouterLink],
  templateUrl: './meus-servicos.html',
  styleUrl: './meus-servicos.css',
})
export class MeusServicos implements OnInit {
  private servicoService = inject(ServicoService);

  usuarioLogadoId = 1;
  meusServicos: Servico[] = [];
  carregando = true;
  mensagemErro = '';

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    this.servicoService.listarServicos().subscribe({
      next: (servicos) => {
        this.meusServicos = servicos.filter(
          servico => servico.clienteId === this.usuarioLogadoId
        );

        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar seus serviços.';
        this.carregando = false;
      }
    });
  }

  cancelarServico(servico: Servico): void {
    this.servicoService.atualizarServico(servico.id, {
      status: 'cancelado'
    }).subscribe({
      next: () => {
        servico.status = 'cancelado';
      },
      error: () => {
        alert('Erro ao cancelar serviço.');
      }
    });
  }

  textoStatus(status: Servico['status']): string {
    const statusFormatado = {
      solicitado: 'Solicitado',
      aceito: 'Aceito',
      em_andamento: 'Em andamento',
      finalizado: 'Finalizado',
      cancelado: 'Cancelado'
    };

    return statusFormatado[status];
  }
}