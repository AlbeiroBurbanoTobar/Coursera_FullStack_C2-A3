import { createReducer, on } from '@ngrx/store';
import { Servicio, addServicio, removeServicio, upvoteServicio, downvoteServicio } from './servicios.actions';

export interface ServiciosState {
  items: Servicio[];
}

const initialState: ServiciosState = {
  items: [
    { id: 1, nombre: 'Masaje Tejido Profundo', descripcion: 'Terapia intensa para aliviar la tensión crónica.', votos: 2 },
    { id: 2, nombre: 'Circuito de Aguas', descripcion: 'Recorrido por sauna, baño turco y piscinas termales.', votos: 5 },
    { id: 3, nombre: 'Tratamiento Facial', descripcion: 'Limpieza e hidratación profunda con productos naturales.', votos: 3 },
  ]
};

// Requisito 9: reducer con 2 actions para agregar y borrar elementos
export const serviciosReducer = createReducer(
  initialState,

  on(addServicio, (state, { servicio }) => ({
    ...state,
    items: [...state.items, servicio]
  })),

  on(removeServicio, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.id !== id)
  })),

  // Requisito 10: voto a favor
  on(upvoteServicio, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, votos: item.votos + 1 } : item
    )
  })),

  // Requisito 10: voto negativo
  on(downvoteServicio, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, votos: item.votos - 1 } : item
    )
  }))
);
