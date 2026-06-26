export type StatusTroca = 'pendente' | 'aceita' | 'recusada' | 'cancelada' | 'finalizada';

export interface Troca {
  id: number;
  usuarioSolicitanteId: number;
  usuarioRecebedorId: number;
  instrumentoOferecidoId: number;
  instrumentoDesejadoId: number;
  mensagem: string;
  status: StatusTroca;
  dataSolicitacao: Date;
}
