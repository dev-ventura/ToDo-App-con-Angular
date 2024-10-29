import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
 welcome = 'Bienvenido a mi Todo App';
 tasks = signal ([
  'Instalar Angular CLI',
  'Crear Proyecto',
  'Crear componentes',
  'Crear servicios',
 ]);
}
