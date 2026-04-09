import { createAction, props } from '@ngrx/store';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  votos: number;
}

// Requísito 9: al menos 2 actions para agregar y borrar elementos
export const addServicio = createAction(
  '[Servicios] Agregar Servicio',
  props<{ servicio: Servicio }>()
);

export const removeServicio = createAction(
  '[Servicios] Eliminar Servicio',
  props<{ id: number }>()
);

// Requisito 10: voto a favor y voto negativo
export const upvoteServicio = createAction(
  '[Servicios] Voto Positivo',
  props<{ id: number }>()
);

export const downvoteServicio = createAction(
  '[Servicios] Voto Negativo',
  props<{ id: number }>()
);
