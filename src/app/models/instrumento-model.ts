export interface Instrumento{
    id: number;
    nome: string;
    tipo: string;
    marca: string;
    modelo: string;
    estado: 'novo' | 'usado' |'precisa_conserto';
    preco: number;
    aceitaTroca: boolean;
    descricao: string;
    donoId: number;
}