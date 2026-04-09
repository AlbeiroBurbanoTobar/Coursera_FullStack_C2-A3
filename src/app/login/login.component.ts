/**
 * LoginComponent — Centro de Relajación y SPA
 * Autor: Albeiro
 *
 * Requisito 2: componente que permite iniciar sesión.
 * Cualquier valor no vacío en ambos campos es aceptado.
 * Al loguearse, navega a /servicios (ruta protegida por authGuard).
 */

import { Component }              from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule }            from '@angular/forms';
import { Router }                 from '@angular/router';
import { AuthService }            from '../auth/auth.service';

@Component({
  selector:    'app-login',
  standalone:  true,
  imports:     [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper d-flex align-items-center justify-content-center">
      <div class="card login-card shadow-lg p-4">
        <div class="text-center mb-4">
          <i class="bi bi-flower1 login-icon"></i>
          <h2 class="fw-bold mt-2">Centro SPA</h2>
          <p class="text-muted small">Ingresa tus credenciales para continuar</p>
        </div>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="mb-3">
            <label for="usuario" class="form-label fw-semibold">Usuario</label>
            <input
              id="usuario"
              type="text"
              class="form-control"
              [(ngModel)]="usuario"
              name="usuario"
              placeholder="Cualquier valor no vacío"
              required
            />
          </div>

          <div class="mb-3">
            <label for="contrasena" class="form-label fw-semibold">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              class="form-control"
              [(ngModel)]="contrasena"
              name="contrasena"
              placeholder="Cualquier valor no vacío"
              required
            />
          </div>

          <div *ngIf="error" class="alert alert-danger py-2 small">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-teal w-100 text-white fw-semibold py-2">
            <i class="bi bi-box-arrow-in-right me-2"></i>Ingresar
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 80vh;
      background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
    }
    .login-card {
      width: 100%;
      max-width: 420px;
      border-radius: 16px;
      border: none;
    }
    .login-icon {
      font-size: 3rem;
      color: #0d9488;
    }
    .btn-teal {
      background: linear-gradient(135deg, #0d9488, #0891b2);
      border: none;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .btn-teal:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(13,148,136,0.35);
    }
    .form-control:focus {
      border-color: #0d9488;
      box-shadow: 0 0 0 0.2rem rgba(13,148,136,0.2);
    }
  `]
})
export class LoginComponent {
  usuario:    string = '';
  contrasena: string = '';
  error:      string = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.usuario.trim() || !this.contrasena.trim()) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }
    this.error = '';
    this.auth.login();
    this.router.navigate(['/servicios']);
  }
}
