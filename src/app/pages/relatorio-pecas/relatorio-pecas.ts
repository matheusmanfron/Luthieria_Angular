import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Peca } from '../../models/peca-model';

@Component({
  selector: 'app-relatorio-pecas',
  imports: [CommonModule, RouterLink],
  templateUrl: './relatorio-pecas.html',
  styleUrl: './relatorio-pecas.css',
})
export class RelatorioPecas {
  pecas: Peca[] = [
    {
      id: 1,
      nome: 'Corda de violão',
      descricao: 'Troca de corda de aço',
      quantidadeEstoque: 12,
      valorUnitario: 25
    },
    {
      id: 2,
      nome: 'Tarraxa',
      descricao: 'Substituição de tarraxa danificada',
      quantidadeEstoque: 4,
      valorUnitario: 45
    },
    {
      id: 3,
      nome: 'Captador',
      descricao: 'Captador para guitarra',
      quantidadeEstoque: 2,
      valorUnitario: 180
    }
  ];

  get totalPecas(): number {
    return this.pecas.reduce(
      (total, peca) => total + peca.quantidadeEstoque,
      0
    );
  }

  get valorTotalEstoque(): number {
    return this.pecas.reduce(
      (total, peca) => total + peca.quantidadeEstoque * peca.valorUnitario,
      0
    );
  }

  get pecaMaisCara(): Peca | undefined {
    return this.pecas.reduce((maior, atual) => {
      return atual.valorUnitario > maior.valorUnitario ? atual : maior;
    }, this.pecas[0]);
  }
}
