/**
 * AuthGuard — Centro de Relajación y SPA
 * Autor: Albeiro
 *
 * Requisito 1: Guard que verifica, usando AuthService, si un usuario está logueado.
 * Requisito 2: se asigna a la ruta /servicios para protegerla.
 * Si no está logueado, redirige a /login.
 */

import { inject }        from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService }   from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.estaLogueado()) {
    return true;
  }

  // Redirige al login si no está autenticado
  router.navigate(['/login']);
  return false;
};
