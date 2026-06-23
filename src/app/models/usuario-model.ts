export type TipoUsuario = 'cliente' | 'luthier';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    password: string;
    tipoUsuario: TipoUsuario;

    tempoExperiencia: number;
    instrumentosAtendidos: string[];
    descricaoProfissional: string;
}