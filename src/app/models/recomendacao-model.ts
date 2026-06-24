import { Instrumento } from "./instrumento-model";

export interface Recomendacao{
    id: number;
    luthierId: number;
    instrumento: Instrumento;
    motivo: string;
}