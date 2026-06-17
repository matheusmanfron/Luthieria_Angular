import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
 listaDeUsuarios: any[] = [];
  mensagemErro: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Injetamos o detector de mudanças aqui
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.authService.listarUsuarios().subscribe({
      next: (dadosDaApi) => {
        // 2. Verificamos se é um array de dados válido
        if (Array.isArray(dadosDaApi)) {
          // 3. Colocamos os dados na variável
          this.listaDeUsuarios = dadosDaApi;
          
          // 4. A CORREÇÃO MÁGICA: Avisamos o HTML para atualizar a tela neste exato segundo!
          this.cdr.detectChanges();
        } else {
          this.listaDeUsuarios = [];
        }
      },
      error: (erro) => {
        this.mensagemErro = 'Falha ao buscar dados: ' + (erro.error?.erro || erro.message);
        
        // Avisamos o HTML caso a mensagem de erro precise aparecer
        this.cdr.detectChanges();
      }
    });
  }

  fazerLogout(): void {
    this.authService.sair(); 
    this.router.navigate(['/login']); 
  }
}
