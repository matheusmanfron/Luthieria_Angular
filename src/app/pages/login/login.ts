import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mensagemErro = '';
  carregando = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagemErro = '';

    this.authService.fazerLogin(this.loginForm.value).subscribe({
      next: (resposta) => {
        this.authService.salvarToken(resposta.token);
        this.carregando = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.carregando = false;
        this.mensagemErro = 'E-mail ou senha inválidos.';
      }
    });
  }
}