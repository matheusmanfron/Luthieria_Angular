export type StatusTroca = 'pendente' | 'aceita' | 'recusada' | 'cancelada' | 'cancelada' | 'finalzada';

export interface Troca{
    id: number;

    usuarioSolicitanteId: number;
    usuarioRecebebedorId: number;

    instrumentoOferecidoId: number;
    instrumentoDesejadoId: number;

    mensagem: String;
    status: StatusTroca;
    dataSolicitacao: Date;
}