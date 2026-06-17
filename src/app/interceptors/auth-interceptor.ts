// src/app/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Busca o token de sessão que guardamos no localStorage durante o login
  const token = localStorage.getItem('token_api');

  // 2. Se o token existir, precisamos clonar a requisição para adicionar a ele
  if (token) {
    const requisicaoClonada = req.clone({
      setHeaders: {
        // Adiciona o cabeçalho exato que a nossa API Node espera receber
        Authorization: `Bearer ${token}`
      }
    });

    // 3. Deixa a requisição seguir viagem com o token anexado
    return next(requisicaoClonada);
  }

  // 4. Se não houver token (ex: usuário deslogado indo pro login), a requisição segue normal
  return next(req);
};