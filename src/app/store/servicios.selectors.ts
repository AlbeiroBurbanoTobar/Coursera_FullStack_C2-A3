import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServiciosState } from './servicios.reducer';

export const selectServiciosState = createFeatureSelector<ServiciosState>('servicios');

export const selectAllServicios = createSelector(
  selectServiciosState,
  (state) => state.items
);
