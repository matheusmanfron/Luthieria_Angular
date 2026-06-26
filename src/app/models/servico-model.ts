export interface Servico{
    id: number;
    clienteId: number;
    instrumentoId: number;
    luthierId: number;
    instrumento: string;
    status: 'solicitado' | 'aceito' | 'em_andamento' | 'finalizado' | 'cancelado';
    observacoes: string;
}