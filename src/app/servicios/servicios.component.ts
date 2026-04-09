import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ServicioFormComponent } from '../servicio-form/servicio-form.component';
import { Servicio, addServicio, removeServicio, upvoteServicio, downvoteServicio } from '../store/servicios.actions';
import { selectAllServicios } from '../store/servicios.selectors';
import { ApiServiciosService } from '../services/api-servicios.service';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, ServicioFormComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {

  // Observable al store de NgRx
  servicios$!: Observable<Servicio[]>;

  constructor(
    private store: Store,
    private api: ApiServiciosService
  ) {}

  ngOnInit(): void {
    this.servicios$ = this.store.select(selectAllServicios);
  }

  cargarDesdeApi(): void {
    this.api.getServicios().subscribe(servicios => {
      // Opcional: Podríamos tener una acción para cargar todos al store.
      // Por simplicidad, agregamos uno por uno (o se podría crear una acción loadServicios)
      servicios.forEach(s => this.store.dispatch(addServicio({ servicio: s })));
    });
  }

  // Requisito 6/8: Usar el servicio HTTP para agregar un nuevo elemento
  onServicioAgregado(servicio: Servicio): void {
    // Llamar al API para agregarlo, pasamos solo el payload requerido
    this.api.agregarServicio({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion
    }).subscribe(); // El subcribe es necesario para ejecutar el Observable
  }

  // Requisito 9: dispatcher de la acción "borrar"
  eliminarServicio(id: number): void {
    this.store.dispatch(removeServicio({ id }));
  }

  // Requisito 10: voto a favor
  votarAFavor(id: number): void {
    this.store.dispatch(upvoteServicio({ id }));
  }

  // Requisito 10: voto negativo
  votarEnContra(id: number): void {
    this.store.dispatch(downvoteServicio({ id }));
  }
}
