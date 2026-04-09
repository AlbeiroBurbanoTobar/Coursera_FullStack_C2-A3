/**
 * DexieService — Centro de Relajación y SPA
 * Autor: Albeiro
 *
 * Requisito 9: base de datos Dexie con al menos una entidad (servicios)
 * que sea inyectada a un componente o servicio.
 */

import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Servicio } from '../store/servicios.actions';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {
  servicios!: Table<Servicio, number>;

  constructor() {
    super('SPADatabase');

    this.version(1).stores({
      servicios: 'id, nombre, descripcion, votos'
    });
  }

  async testConnection() {
    try {
      await this.open();
      console.log('Dexie DB Connection successful. Autor: Albeiro');
    } catch (error) {
      console.error('Dexie DB Connection failed', error);
    }
  }
}
