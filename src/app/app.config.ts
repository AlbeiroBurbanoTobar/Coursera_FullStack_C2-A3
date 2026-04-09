import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { LoginComponent } from './login/login.component';
import { serviciosReducer } from './store/servicios.reducer';
import { authGuard } from './auth/auth.guard';

// Tokens y Servicios para Inyección de Dependencias
import { APP_CONFIG, APP_CONFIG_VALUE } from './config/app.config.token';
import { INotificacionService, NotificacionService } from './services/notificacion.service';
import { LoggerService, ApiLoggerService } from './services/logger.service';

// Requisito 2: configuración de rutas con un componente protegido por Guard
const routes: Routes = [
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: HomeComponent },
  { 
    path: 'servicios', 
    component: ServiciosComponent,
    canActivate: [authGuard] // Requisito 2
  },
  { path: '**', redirectTo: '/servicios' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ servicios: serviciosReducer }),
    provideHttpClient(), // Habilita inyección de HttpClient (Requisito 7)
    
    // Requisito 3: literal inyectado como dependencia con un InjectionToken propio
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },

    // Requisito 4: inyección configurada con useClass
    { provide: INotificacionService, useClass: NotificacionService },

    // Requisito 5: inyección configurada con useExisting
    { provide: LoggerService, useExisting: ApiLoggerService }
  ]
};
