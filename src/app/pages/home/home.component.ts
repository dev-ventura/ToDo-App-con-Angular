import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl('', {
    // permite que el input al ingresar la tarea no sea nulo
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });
  // funcion para el input
  changeHandler(){
    if (this.newTaskCtrl.valid){
      // usamos trim para quitar los espacios de inicio y final
      const value = this.newTaskCtrl.value.trim();
      if (value !== ''){
        this.addTask(value);
        //una vez agregada la tarea el input queda vacio
        this.newTaskCtrl.setValue('');
      }  
    }
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
  // funcion para actualizacion de la tarjeta
  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }
  // funcion para editar la tarea
  updateTaskEditingMode(index:number){
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index){
          return {
            ...task,
            editing: true,
          }
        }
        return {
          ...task,
          editing: false,
        }
      });
    })
  }
  // funcion para la tarea editada actualizada
  updateTaskText(index:number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index){
          return {
            ...task,
            title: input.value,
            editing: false,
          }
        }
        return task;
      });
    })
  }
}

