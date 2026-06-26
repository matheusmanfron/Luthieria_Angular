import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Instrumento } from '../../models/instrumento-model';
import { InstrumentoService } from '../../services/instrumento';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  private instrumentoService = inject(InstrumentoService);
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  instrumentos: Instrumento[] = [];
  carregando = true;
  mensagemErro = '';

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
        this.mensagemErro = 'Erro ao carregar instrumentos.';
        this.carregando = false;
      }
    });
  }

  adicionarAoCarrinho(instrumento: Instrumento): void {
    this.carrinhoService.adicionarAoCarrinho(instrumento);
    alert(`${instrumento.nome} adicionado ao carrinho.`);
  }

  solicitarTroca(instrumento: Instrumento): void {
    this.router.navigate(['/troca/solicitar'], {
      queryParams: {
        instrumentoDesejadoId: instrumento.id
      }
    });
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
