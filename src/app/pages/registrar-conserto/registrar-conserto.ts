import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Servico } from '../../models/servico-model';
import { Peca } from '../../models/peca-model';
import { ServicoService } from '../../services/servico-luthier';

@Component({
  selector: 'app-registrar-conserto',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrar-conserto.html',
  styleUrl: './registrar-conserto.css',
})
export class RegistrarConserto implements OnInit {
  private fb = inject(FormBuilder);
  private servicoService = inject(ServicoService);

  servicos: Servico[] = [];
  pecasUtilizadas: Peca[] = [];
  carregando = true;
  mensagemErro = '';

  consertoForm = this.fb.group({
    servicoId: [0, [Validators.required, Validators.min(1)]],
    problemaEncontrado: ['', [Validators.required, Validators.minLength(5)]],
    servicoRealizado: ['', [Validators.required, Validators.minLength(5)]],
    pecaNome: [''],
    pecaDescricao: [''],
    pecaValor: [0],
    maoDeObra: [0, [Validators.required, Validators.min(0)]],
    observacoesFinais: [''],
  });

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos(): void {
    this.servicoService.listarServicos().subscribe({
      next: (dados) => {
        this.servicos = dados.filter(servico =>
          servico.status === 'aceito' || servico.status === 'em_andamento'
        );
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar serviÃ§os.';
        this.carregando = false;
      }
    });
  }

  adicionarPeca(): void {
    const nome = this.consertoForm.value.pecaNome;
    const descricao = this.consertoForm.value.pecaDescricao;
    const valor = Number(this.consertoForm.value.pecaValor);

    if (!nome || valor <= 0) {
      alert('Informe o nome da peÃ§a e um valor maior que zero.');
      return;
    }

    const peca: Peca = {
      id: Date.now(),
      nome,
      descricao: descricao ?? '',
      quantidadeEstoque: 1,
      valorUnitario: valor
    };

    this.pecasUtilizadas.push(peca);

    this.consertoForm.patchValue({
      pecaNome: '',
      pecaDescricao: '',
      pecaValor: 0
    });
  }

  removerPeca(id: number): void {
    this.pecasUtilizadas = this.pecasUtilizadas.filter(peca => peca.id !== id);
  }

  get totalPecas(): number {
    return this.pecasUtilizadas.reduce(
      (total, peca) => total + peca.valorUnitario,
      0
    );
  }

  get totalConserto(): number {
    return this.totalPecas + Number(this.consertoForm.value.maoDeObra ?? 0);
  }

  finalizarConserto(): void {
    if (this.consertoForm.invalid) {
      this.consertoForm.markAllAsTouched();
      return;
    }

    const servicoId = Number(this.consertoForm.value.servicoId);

    this.servicoService.finalizarServico(servicoId).subscribe({
      next: () => {
        alert(`Conserto registrado e finalizado. Valor total: R$ ${this.totalConserto.toFixed(2)}`);
        this.pecasUtilizadas = [];
        this.consertoForm.reset({
          servicoId: 0,
          pecaValor: 0,
          maoDeObra: 0
        });
        this.carregarServicos();
      },
      error: () => {
        alert('Erro ao finalizar conserto.');
      }
    });
  }
}
