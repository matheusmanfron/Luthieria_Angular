import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { CarrinhoService } from '../../services/carrinho';
import { ItemCarrinho } from '../../models/carrinho-model';

@Component({
  selector: 'app-carrinho',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  itens: ItemCarrinho[] = [];

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    this.itens = this.carrinhoService.listarItens();
  }

  get total(): number {
    return this.carrinhoService.calcularTotal();
  }

  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade++;
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade--;
      return;
    }

    this.removerItem(item.instrumento.id);
  }

  removerItem(instrumentoId: number): void {
    this.carrinhoService.removerItem(instrumentoId);
    this.carregarCarrinho();
  }

  limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();
    this.carregarCarrinho();
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) {
      alert('Seu carrinho estÃ¡ vazio.');
      return;
    }

    alert('Compra finalizada com sucesso! Esta Ã© apenas uma representaÃ§Ã£o de front-end.');
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['/dashboard']);
  }
}
