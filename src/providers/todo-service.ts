import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocketService } from './socket-service';

@Injectable()
export class TodoService {

  constructor(private http: Http,
              private socketS: SocketService) {
    var collection = {
      'name': 'todos',
      'subscribers': {
          'allTodos': this.renderAllTodos
      },
    };
    this.socketS.appendCollection(collection);
  }

  saveTodo(todo) {
    console.log('in saveTodo and socket is: ', this.socketS.socket);
    this.socketS.collections['todos'].emit('saveTodo', {
      id: Math.ceil(Math.random() * 1000),
      name: todo
    });
    // this.socketObserver.next({ category: 'saveTodo', todo: todo });
  }

  renderAllTodos(data) {
    console.log('socket returned data');
    console.log(data);
    // this.socketObserver.next({ category: 'message', message: msg });
  }

}
