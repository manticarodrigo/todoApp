import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SocketService } from '../../providers/socket-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todo = '';
  constructor(public navCtrl: NavController,
              private socketS: SocketService) {

  }

  saveTodo() {
    console.log("Saving todo: " + this.todo);
    this.socketS.saveTodo(this.todo);
    this.todo = '';
  }

}
