import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // definiendo signal con parametros de Task creado en model
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed:false
    },
    {
      id: Date.now(),
      title: 'Creando codigo a traves de componentes',
      completed: false
    },
  ]);
  // funcion para el input
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }
  // funcion para agregar una tarea
  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  // funcion para eliminar una tarea
  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }
}

