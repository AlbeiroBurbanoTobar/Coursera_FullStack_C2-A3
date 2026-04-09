/**
 * ApiServiciosService — Centro de Relajación y SPA
 * Autor: Albeiro
 *
 * Requisito 7: Servicio en Angular que se comunique asíncronamente con el api usando Http.
 * Requisito 8: Dispatch al store NgRx cuando se agrega elemento con éxito.
 * Requisito 10: Agregar a Dexie cuando el API retorne respuesta positiva.
 */

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Servicio, addServicio } from '../store/servicios.actions';
import { APP_CONFIG, AppConfig } from '../config/app.config.token';
import { DexieService } from './dexie.service';
import { INotificacionService } from './notificacion.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiciosService {

  // Requisito 3: Se inyecta APP_CONFIG usando el InjectionToken propio
  constructor(
    private http: HttpClient,
    private store: Store,
    private dexieDB: DexieService,
    private notificador: INotificacionService, // Requisito 4 (useClass)
    private logger: LoggerService,             // Requisito 5 (useExisting)
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  /**
   * Obtiene todos los servicios desde el backend Express
   */
  getServicios(): Observable<Servicio[]> {
    this.logger.log(`Obteniendo servicios desde ${this.config.apiUrl}/servicios`);
    return this.http.get<Servicio[]>(`${this.config.apiUrl}/servicios`);
  }

  /**
   * Agrega un nuevo servicio al backend Express.
   * Si es exitoso, notifica a NgRx (Requisito 8) y almacena en Dexie (Requisito 10).
   */
  agregarServicio(servicioData: { nombre: string; descripcion: string }): Observable<Servicio> {
    this.logger.log(`Enviando POST a ${this.config.apiUrl}/servicios`);
    return this.http.post<Servicio>(`${this.config.apiUrl}/servicios`, servicioData).pipe(
      tap({
        next: (servicioCreado: Servicio) => {
          // Requisito 8: Cuando asíncronamente el API retorne una respuesta afirmativa
          // ante el agregado de un elemento, el servicio creado debe notificar a Redux.
          this.store.dispatch(addServicio({ servicio: servicioCreado }));
          
          this.logger.log(`NgRx Store actualizado con nuevo servicio ID: ${servicioCreado.id}`);

          // Requisito 10: Cuando se agrega un elemento exitosamente en la API,
          // debe agregarse asíncronamente también en Dexie.
          this.dexieDB.servicios.add(servicioCreado).then(() => {
            this.logger.log(`Servicio ID: ${servicioCreado.id} guardado en Dexie DB.`);
          }).catch(err => {
            this.logger.warn(`Error al guardar en Dexie: ${err}`);
          });

          // Notificación general al usuario usando la interfaz y useClass
          this.notificador.notificar(`Servicio "${servicioCreado.nombre}" agregado vía API correctamente.`);
        },
        error: (err) => {
          this.logger.warn(`Error al agregar el servicio vía API: ${err.message}`);
        }
      })
    );
  }
}
