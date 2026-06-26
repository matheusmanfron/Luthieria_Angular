import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Instrumento } from '../../models/instrumento-model';
import { InstrumentoService } from '../../services/instrumento';

@Component({
  selector: 'app-meus-anuncios',
  imports: [CommonModule, CurrencyPipe, RouterLink],
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
        this.mensagemErro = 'Erro ao carregar seus anúncios.';
        this.carregando = false;
      }
    });
  }

  pausarAnuncio(instrumento: Instrumento): void {
    alert(`Anúncio "${instrumento.nome}" pausado apenas como representação.`);
  }

  removerDaTela(instrumentoId: number): void {
    this.meusAnuncios = this.meusAnuncios.filter(
      instrumento => instrumento.id !== instrumentoId
    );

    alert('Anúncio removido da tela. Remoção apenas visual no front-end.');
  }
}