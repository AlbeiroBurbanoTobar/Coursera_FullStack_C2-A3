/**
 * AuthService — Centro de Relajación y SPA
 * Autor: Albeiro
 *
 * Requisito 1: servicio que verifica si un usuario está logueado o no.
 * El estado se persiste en sessionStorage para que sobreviva la navegación
 * dentro de la misma pestaña pero se reinicie al cerrar el browser.
 */

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly STORAGE_KEY = 'spa_logueado';

  /** Retorna true si el usuario está autenticado */
  estaLogueado(): boolean {
    return sessionStorage.getItem(this.STORAGE_KEY) === 'true';
  }

  /** Registra al usuario como logueado */
  login(): void {
    sessionStorage.setItem(this.STORAGE_KEY, 'true');
  }

  /** Cierra la sesión */
  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
