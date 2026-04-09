import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero-section text-center py-5">
      <div class="container py-4">
        <h1 class="display-4 fw-bold text-teal mb-3">Centro de Relajación y SPA</h1>
        <p class="lead text-muted mb-4 fs-4">
          Encuentra la paz interior con nuestros servicios de masajes,
          tratamientos faciales y bienestar terapéutico.
        </p>
        <a routerLink="/servicios" class="btn btn-teal btn-lg text-white shadow px-5 py-3">
          <i class="bi bi-arrow-right-circle me-2"></i>Ver Catálogo de Servicios
        </a>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);
    }
    .text-teal { color: #0d9488; }
    .btn-teal {
      background: linear-gradient(135deg, #0d9488, #0891b2);
      border: none;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .btn-teal:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(13, 148, 136, 0.4) !important;
    }
  `]
})
export class HomeComponent {}
