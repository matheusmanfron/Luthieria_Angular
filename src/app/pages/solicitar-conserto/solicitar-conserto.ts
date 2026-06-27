import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Servico } from '../../models/servico-model';
import { ServicoService } from '../../services/servico-luthier';

@Component({
  selector: 'app-solicitar-conserto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitar-conserto.html',
  styleUrl: './solicitar-conserto.css',
})
export class SolicitarConserto implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private servicoService = inject(ServicoService);

  carregando = false;
  mensagemErro = '';

  consertoForm = this.fb.group({
    instrumentoId: [0],
    instrumento: ['', Validators.required],
    problema: ['', [Validators.required, Validators.minLength(10)]],
    luthierId: [1, Validators.required]
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const instrumentoId = Number(params.get('instrumentoId') ?? 0);
      const instrumento = params.get('instrumento') ?? '';

      this.consertoForm.patchValue({
        instrumentoId,
        instrumento
      });
    });
  }

  onSubmit(): void {
    if (this.consertoForm.invalid) {
      this.consertoForm.markAllAsTouched();
      return;
    }

    const valor = this.consertoForm.value;

    const servico: Servico = {
      id: Date.now(),
      clienteId: 1,
      instrumentoId: Number(valor.instrumentoId),
      luthierId: Number(valor.luthierId),
      instrumento: valor.instrumento ?? '',
      status: 'solicitado',
      observacoes: valor.problema ?? ''
    };

    this.carregando = true;
    this.mensagemErro = '';

    this.servicoService.solicitarConserto(servico).subscribe({
      next: () => {
        this.carregando = false;
        alert('Solicitação de conserto enviada com sucesso!');
        this.router.navigate(['/meus-servicos']);
      },
      error: (erro) => {
        this.carregando = false;
        this.mensagemErro = erro?.error?.erro || 'Erro ao solicitar conserto.';
        console.error('Erro ao solicitar conserto:', erro);
      }
    });
  }
}
