import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Troca } from '../../models/troca-model';
import { Instrumento } from '../../models/instrumento-model';
import { TrocaService } from '../../services/troca';
import { InstrumentoService } from '../../services/instrumento';

@Component({
  selector: 'app-solicitar-troca',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './solicitar-troca.html',
  styleUrl: './solicitar-troca.css',
})
export class SolicitarTroca implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private trocaService = inject(TrocaService);
  private instrumentoService = inject(InstrumentoService);
  private router = inject(Router);

  instrumentos: Instrumento[] = [];
  carregando = true;
  mensagemErro = '';

  trocaForm = this.fb.group({
    instrumentoDesejadoId: [0, [Validators.required, Validators.min(1)]],
    instrumentoOferecidoId: [0, [Validators.required, Validators.min(1)]],
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const instrumentoDesejadoId = Number(params.get('instrumentoDesejadoId') ?? 0);

      if (instrumentoDesejadoId > 0) {
        this.trocaForm.patchValue({ instrumentoDesejadoId });
      }
    });

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

  onSubmit(): void {
    if (this.trocaForm.invalid) {
      this.trocaForm.markAllAsTouched();
      return;
    }

    const valor = this.trocaForm.value;

    const troca: Troca = {
      id: Date.now(),
      usuarioSolicitanteId: 1,
      usuarioRecebedorId: 2,
      instrumentoOferecidoId: Number(valor.instrumentoOferecidoId),
      instrumentoDesejadoId: Number(valor.instrumentoDesejadoId),
      mensagem: valor.mensagem ?? '',
      status: 'pendente',
      dataSolicitacao: new Date()
    };

    this.trocaService.solicitarTroca(troca).subscribe({
      next: () => {
        alert('SolicitaÃ§Ã£o de troca enviada com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Erro ao solicitar troca.');
      }
    });
  }
}
