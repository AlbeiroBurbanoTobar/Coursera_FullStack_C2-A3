/**
 * LoggerService / ApiLoggerService — useExisting demo
 * Autor: Albeiro
 *
 * Requisito 5: inyección de dependencias con useExisting.
 * - LoggerService es la clase base (X).
 * - ApiLoggerService extiende LoggerService (Y hereda de X).
 * - Se configura { provide: LoggerService, useExisting: ApiLoggerService }.
 * Quien inyecte LoggerService, recibirá la misma instancia de ApiLoggerService.
 */

import { Injectable } from '@angular/core';

// Clase base X
@Injectable()
export class LoggerService {
  log(mensaje: string): void {
    console.log(`[Logger] ${mensaje}`);
  }

  warn(mensaje: string): void {
    console.warn(`[Logger WARN] ${mensaje}`);
  }
}

// Clase Y que hereda de X (ApiLoggerService extends LoggerService)
@Injectable({ providedIn: 'root' })
export class ApiLoggerService extends LoggerService {

  override log(mensaje: string): void {
    const ts = new Date().toISOString();
    console.log(`[ApiLogger ${ts}] 🌐 ${mensaje}`);
  }

  override warn(mensaje: string): void {
    const ts = new Date().toISOString();
    console.warn(`[ApiLogger WARN ${ts}] ⚠️ ${mensaje}`);
  }
}
