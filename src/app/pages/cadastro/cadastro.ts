import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

type TipoUsuario = 'cliente' | 'luthier';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  tipoSelecionado: TipoUsuario | null = null;
  mensagemErro = '';
  carregando = false;

  cadastroForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    tempoExperiencia: [''],
    instrumentosAtendidos: [''],
    descricaoProfissional: [''],
  });

  selecionarTipo(tipo: TipoUsuario): void {
    this.tipoSelecionado = tipo;
    this.mensagemErro = '';

    const tempoExperiencia = this.cadastroForm.get('tempoExperiencia');
    const instrumentosAtendidos = this.cadastroForm.get('instrumentosAtendidos');
    const descricaoProfissional = this.cadastroForm.get('descricaoProfissional');

    if (tipo === 'luthier') {
      tempoExperiencia?.setValidators([Validators.required]);
      instrumentosAtendidos?.setValidators([Validators.required]);
      descricaoProfissional?.setValidators([Validators.required, Validators.minLength(10)]);
    } else {
      tempoExperiencia?.clearValidators();
      instrumentosAtendidos?.clearValidators();
      descricaoProfissional?.clearValidators();

      this.cadastroForm.patchValue({
        tempoExperiencia: '',
        instrumentosAtendidos: '',
        descricaoProfissional: ''
      });
    }

    tempoExperiencia?.updateValueAndValidity();
    instrumentosAtendidos?.updateValueAndValidity();
    descricaoProfissional?.updateValueAndValidity();
  }

  voltarEscolha(): void {
    this.tipoSelecionado = null;
    this.cadastroForm.reset();
  }

  onSubmit(): void {
    if (!this.tipoSelecionado) {
      this.mensagemErro = 'Selecione se vocÃª Ã© cliente ou luthier.';
      return;
    }

    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    const valor = this.cadastroForm.value;

    const usuario = {
      nome: valor.nome ?? '',
      email: valor.email ?? '',
      telefone: valor.telefone ?? '',
      senha: valor.senha ?? '',
      tipo: this.tipoSelecionado,
      tempoExperiencia: this.tipoSelecionado === 'luthier' ? valor.tempoExperiencia : null,
      instrumentosAtendidos: this.tipoSelecionado === 'luthier'
        ? (valor.instrumentosAtendidos ?? '')
          .split(',')
          .map(instrumento => instrumento.trim())
          .filter(instrumento => instrumento.length > 0)
        : [],
      descricaoProfissional: this.tipoSelecionado === 'luthier' ? valor.descricaoProfissional : ''
    };

    this.carregando = true;
    this.mensagemErro = '';

    this.authService.cadastrarUsuario(usuario).subscribe({
      next: () => {
        this.carregando = false;
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.carregando = false;
        this.mensagemErro = 'Erro ao realizar cadastro.';
      }
    });
  }
}
