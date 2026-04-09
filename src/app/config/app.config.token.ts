/**
 * APP_CONFIG — Injection Token de configuración global
 * Autor: Albeiro
 *
 * Requisito 3: variable de configuración inyectada como dependencia
 * usando un InjectionToken propio.
 */

import { InjectionToken } from '@angular/core';

export interface AppConfig {
  appName: string;
  apiUrl:  string;
  version: string;
  autor:   string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

/** Valor por defecto que se provee con useValue en app.config.ts */
export const APP_CONFIG_VALUE: AppConfig = {
  appName: 'Centro de Relajación y SPA',
  apiUrl:  'http://localhost:3000/api',
  version: '1.0.0',
  autor:   'Albeiro',
};
