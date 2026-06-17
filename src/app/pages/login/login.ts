import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink], // Importa o ReactiveFormsModule
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.fazerLogin(this.loginForm.value).subscribe({
        next: (resposta) => {
          // Salva o token recebido no LocalStorage
          this.authService.salvarToken(resposta.token);
          alert('Login realizado!');
          this.router.navigate(['/dashboard']); // Libera o acesso à área privada
        },
        error: (erro) => {
          alert('Credenciais inválidas!');
        }
      });
    }
  }
}
