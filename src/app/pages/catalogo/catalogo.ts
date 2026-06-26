import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Instrumento } from '../../models/instrumento-model';
import { InstrumentoService } from '../../services/instrumento';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  instrumentos: Instrumento[] = [];
  carregando = true;
  mensagemErro = '';

  constructor(
    private instrumentoService: InstrumentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarInstrumentos();
  }

  carregarInstrumentos(): void {
    this.instrumentoService.listarInstrumentos().subscribe({
      next: (dados) => {
        this.instrumentos = dados;
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar instrumentos';
        this.carregando = false;
      }
    });
  }

  adicionarAoCarrinho(instrumento: Instrumento): void {
    alert(`${instrumento.nome} adicionado ao carrinho.`);
  }

  solicitarTroca(instrumento: Instrumento): void {
    alert(`Solicitação de troca para ${instrumento.nome}.`);
  }

  solicitarConserto(instrumento: Instrumento): void {
    this.router.navigate(['/conserto/solicitar'], {
      queryParams: {
        instrumentoId: instrumento.id,
        instrumento: instrumento.nome
      }
    });
  }
}
