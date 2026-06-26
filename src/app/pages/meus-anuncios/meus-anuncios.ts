import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Instrumento } from '../../models/instrumento-model';
import { InstrumentoService } from '../../services/instrumento';

@Component({
  selector: 'app-meus-anuncios',
  imports: [CommonModule, RouterLink],
  templateUrl: './meus-anuncios.html',
  styleUrl: './meus-anuncios.css',
})
export class MeusAnuncios implements OnInit {
  private instrumentoService = inject(InstrumentoService);

  usuarioLogadoId = 1;
  meusAnuncios: Instrumento[] = [];
  carregando = true;
  mensagemErro = '';

  ngOnInit(): void {
    this.carregarMeusAnuncios();
  }

  carregarMeusAnuncios(): void {
    this.instrumentoService.listarInstrumentos().subscribe({
      next: (instrumentos) => {
        this.meusAnuncios = instrumentos.filter(
          instrumento => instrumento.donoId === this.usuarioLogadoId
        );
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar seus anÃºncios.';
        this.carregando = false;
      }
    });
  }

  pausarAnuncio(instrumento: Instrumento): void {
    alert(`AnÃºncio "${instrumento.nome}" pausado apenas como representaÃ§Ã£o.`);
  }

  removerDaTela(instrumentoId: number): void {
    this.meusAnuncios = this.meusAnuncios.filter(
      instrumento => instrumento.id !== instrumentoId
    );

    alert('AnÃºncio removido da tela. RemoÃ§Ã£o apenas visual no front-end.');
  }
}
