import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  @HostBinding('class') hostClass = 'row mt-4';

  elementos: { nombre: string, descripcion: string }[] = [
    { nombre: 'Masaje Tejido Profundo', descripcion: 'Terapia intensa para aliviar la tensión crónica.' },
    { nombre: 'Circuito de Aguas', descripcion: 'Recorrido por sauna, baño turco y piscinas termales.' },
    { nombre: 'Tratamiento Facial', descripcion: 'Limpieza e hidratación profunda con productos naturales.' }
  ];

  agregarItem(nombre: string, descripcion: string): void {
    if (nombre && descripcion) {
      this.elementos.push({ nombre, descripcion });
    }
  }
}
