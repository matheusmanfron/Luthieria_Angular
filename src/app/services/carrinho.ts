import { Injectable } from '@angular/core';
import { Instrumento } from '../models/instrumento-model';
import { ItemCarrinho } from '../models/carrinho-model';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService{
    private itens: ItemCarrinho[] = [];

    adicionarAoCarrinho(instrumento: Instrumento): void{
        this.itens.push({
            instrumento,
            quantidade: 1
        });
    }

    listarItens(): ItemCarrinho[]{
        return this.itens;
    }

    removerItem(instrumentoId: number): void{
        this.itens = this.itens.filter(
            item => item.instrumento.id !== instrumentoId
        );
    }

    limparCarrinho(): void{
        this.itens = [];
    }

    calcularTotal(): number {
        return this.itens.reduce(
            (total, item) => total + item.instrumento.preco * item.quantidade, 0
        );
    }
}