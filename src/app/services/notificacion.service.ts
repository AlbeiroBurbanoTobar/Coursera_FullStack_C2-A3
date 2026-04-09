/**
 * NotificacionService — useClass demo
 * Autor: Albeiro
 *
 * Requisito 4: inyección de dependencias con useClass.
 * Se define una clase abstracta/base INotificacionService y se vincula
 * con la implementación concreta NotificacionService mediante useClass.
 */

import { Injectable } from '@angular/core';

// Clase base / interfaz abstracta que actúa como token de inyección
export abstract class INotificacionService {
  abstract notificar(mensaje: string): void;
}

// Implementación concreta (Requisito 4: useClass)
@Injectable()
export class NotificacionService extends INotificacionService {

  override notificar(mensaje: string): void {
    console.log(`[NotificacionService] 🔔 ${mensaje}`);
    // En una app real aquí podría haber un snackbar/toast
    alert(`✅ ${mensaje}`);
  }
}
