import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SocketService } from './socket-service';

@Injectable()
export class TodoService {

  todos: Observable<any[]>
  private _todos: BehaviorSubject<any[]>;

  constructor(private socketService: SocketService) {
    var collection = {
      'name': 'todos',
      'subscribers': {
          'allTodos': this.renderAllTodos
      },
    };
    this.socketService.appendCollection(collection);

    this._todos = <BehaviorSubject<any[]>>new BehaviorSubject([]);
    this.todos = this._todos.asObservable();
  }

  renderAllTodos(data) {
    console.log('Socket returned data :');
    console.log(data);
    this._todos.next(data);
  }

  saveTodo(todo) {
    console.log('in saveTodo and socket is: ', this.socketService.socket);
    this.socketService.pubData('todos', 'saveTodo', todo, function(savedToLocal) {
        console.log('savedToLocal : ', savedToLocal);
    });
  }

  removeTodo(todo) {
    this.socketService.pubData('todos', 'deleteTodo', todo, function(savedToLocal) {
        console.log('savedToLocal : ', savedToLocal);
    });
  }

}
