import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Instrumento } from '../../models/instrumento-model';
import { InstrumentoService } from '../../services/instrumento';
import { CarrinhoService } from '../../services/carrinho';

@Component({
  selector: 'app-instrumento-detalhes',
  imports: [CommonModule, RouterLink],
  templateUrl: './instrumento-detalhes.html',
  styleUrl: './instrumento-detalhes.css',
})
export class InstrumentoDetalhes implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private instrumentoService = inject(InstrumentoService);
  private carrinhoService = inject(CarrinhoService);

  instrumento?: Instrumento;
  carregando = true;
  mensagemErro = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.instrumentoService.listarInstrumentos().subscribe({
      next: (instrumentos) => {
        this.instrumento = instrumentos.find(item => item.id === id);
        this.carregando = false;

        if (!this.instrumento) {
          this.mensagemErro = 'Instrumento nÃ£o encontrado.';
        }
      },
      error: () => {
        this.carregando = false;
        this.mensagemErro = 'Erro ao carregar detalhes do instrumento.';
      }
    });
  }

  adicionarAoCarrinho(): void {
    if (!this.instrumento) {
      return;
    }

    this.carrinhoService.adicionarAoCarrinho(this.instrumento);
    alert('Instrumento adicionado ao carrinho!');
  }

  solicitarConserto(): void {
    if (!this.instrumento) {
      return;
    }

    this.router.navigate(['/conserto/solicitar'], {
      queryParams: {
        instrumentoId: this.instrumento.id,
        instrumento: this.instrumento.nome
      }
    });
  }

  solicitarTroca(): void {
    if (!this.instrumento) {
      return;
    }

    this.router.navigate(['/troca/solicitar'], {
      queryParams: {
        instrumentoDesejadoId: this.instrumento.id
      }
    });
  }
}
