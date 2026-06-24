export interface Servico{
    id: number;
    clienteId: number;
    istrumentoId: number;
    luthierId: number;
    instrumento: string;
    status: 'solicitado' | 'aceito' | 'em_andamento' | 'finalizado' | 'cancelado';
    observacoes: string;
}