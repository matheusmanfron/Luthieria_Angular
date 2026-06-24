import { Injectable } from '@angular/core';
import { Instrumento } from '../models/instrumento-model';
import { Usuario } from '../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class RecomendacaoService {
  gerarRecomendacoes(
    luthier: Usuario,
    instrumentos: Instrumento[]
  ): Instrumento[] {
    if (!luthier.instrumentosAtendidos) {
      return [];
    }

    return instrumentos.filter(instrumento =>
      luthier.instrumentosAtendidos!.includes(instrumento.tipo)
    );
  }
}