import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Instrumento } from '../../models/instrumento-model';
import { InstrumentoService } from '../../services/instrumento';

@Component({
  selector: 'app-cadastrar-instrumento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-instrumento.html',
  styleUrl: './cadastrar-instrumento.css',
})
export class CadastrarInstrumento {
  private fb = inject(FormBuilder);
  private instrumentoService = inject(InstrumentoService);
  private router = inject(Router);

  instrumentoForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    tipo: ['', Validators.required],
    marca: ['', Validators.required],
    modelo: ['', Validators.required],
    estado: ['usado', Validators.required],
    preco: [0, [Validators.required, Validators.min(0)]],
    aceitaTroca: [false],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.instrumentoForm.invalid) {
      this.instrumentoForm.markAllAsTouched();
      return;
    }

    const valor = this.instrumentoForm.value;

    const instrumento: Instrumento = {
      id: Date.now(),
      nome: valor.nome ?? '',
      tipo: valor.tipo ?? '',
      marca: valor.marca ?? '',
      modelo: valor.modelo ?? '',
      estado: valor.estado as 'novo' | 'usado' | 'precisa_conserto',
      preco: Number(valor.preco),
      aceitaTroca: Boolean(valor.aceitaTroca),
      descricao: valor.descricao ?? '',
      donoId: 1
    };

    this.instrumentoService.cadastrarInstrumento(instrumento).subscribe({
      next: () => {
        alert('Instrumento anunciado com sucesso!');
        this.router.navigate(['/catalogo']);
      },
      error: () => {
        alert('Erro ao cadastrar instrumento.');
      }
    });
  }
}