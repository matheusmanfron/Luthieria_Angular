import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink], // Importa o ReactiveFormsModule
  templateUrl: './cadastro.html'
})
export class Cadastro {
  cadastroForm: FormGroup; // Declara o formulário

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Constrói o formulário com as validações necessárias
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      // Pega os dados validados e envia para o Serviço
      this.authService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: (resposta) => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']); // Envia para o login
        },
        error: (erro) => {
          alert('Erro ao cadastrar: ' + erro.error.erro);
        }
      });
    }
  }
}