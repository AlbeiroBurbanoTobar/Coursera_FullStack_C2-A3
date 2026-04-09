import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Servicio } from '../store/servicios.actions';
import { longitudMinimaValidator } from './validators';

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-form.component.html',
  styleUrl: './servicio-form.component.css'
})
export class ServicioFormComponent {

  // Requisito 1: EventEmitter decorado con @Output
  @Output() servicioAgregado = new EventEmitter<Servicio>();

  servicioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Requisito 4: configuración del formGroup con FormBuilder, con al menos 2 controles
    this.servicioForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          // Requisito 7: validación personalizada parametrizable (mínimo 4 caracteres)
          longitudMinimaValidator(4)
        ]
      ],
      descripcion: [
        '',
        [Validators.required]
      ]
    });
  }

  onSubmit(): void {
    if (this.servicioForm.valid) {
      const nuevoServicio: Servicio = {
        id: Date.now(),
        nombre: this.servicioForm.value.nombre.trim(),
        descripcion: this.servicioForm.value.descripcion.trim(),
        votos: 0
      };
      // Requisito 1: emitir el evento al componente padre
      this.servicioAgregado.emit(nuevoServicio);
      this.servicioForm.reset();
    } else {
      this.servicioForm.markAllAsTouched();
    }
  }
}
