import { Instrumento } from "./instrumento-model";

export interface ItemCarrinho{
    instrumento: Instrumento;
    quantidade: number;
}

export interface Carrinho{
    itens: ItemCarrinho[];
    valorTotal: number;
}