import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TodoService } from '../../providers/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todo = {
    id: null,
    name: ''
  };
  todos: any;
  constructor(public navCtrl: NavController,
              private todoService: TodoService) {
  }

  ionViewWillLoad() {
    this.todos = this.todoService.todos; // subscribe to entire collection
  }

  saveTodo() {
    console.log("Saving todo: " + this.todo.name);
    if (!this.todo.id) {
      this.todo.id = Math.ceil(Math.random() * 1000);
    }
    this.todoService.saveTodo(this.todo);
    this.todo = {
      id: null,
      name: ''
    };
  }

  editTodo(todo) {
    this.todo = todo;
  }

}
