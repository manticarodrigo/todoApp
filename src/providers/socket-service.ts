import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  collections: any;
  port = 'http://localhost:2000';
  socket: any;
  isConnectionAlive = false;

  constructor() {
  }


  initialize() {
    console.log("Initializing sockets...");
    
    this.socket = io.connect(this.port);

    this.socket.on("connect", (msg) => {
      console.log('on connect');
      this.isConnectionAlive = true;
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('on reconnecting');
      this.isConnectionAlive = false;
    });

    this.socket.on("reconnect_error", (msg) => {
      console.log('on reconnect_error');
      this.isConnectionAlive = false;
    });
    
    this.socket.on("reconnect_failed", (msg) => {
      console.log('on reconnect_failed');
      this.isConnectionAlive = false;
    });

    this.socket.on('disconnect', function () {
      console.log('user disconnected');
      this.isConnectionAlive = false;
    });
  }

  appendCollection(coll) {
    // Create a "Sub-Socket" for each collection
    let self = this;
    var name = coll.name;
    var _s = io.connect(self.port + '/' + name);
    console.log(Object.keys(coll.subscribers));
    Object.keys(coll.subscribers).forEach(mthd => {
      console.log(coll.subscribers[mthd]);
        _s.on(mthd, coll.subscribers[mthd]);
    });
    self.collections = {};
    self.collections[name] = _s;
  }

  saveToLocalStorage(collection, data) {
      var savedData = this.getFromLocalStorage(collection);
      var ls = savedData || [];
      ls.push(data);
      localStorage.setItem(collection, JSON.stringify(ls));
  }

  clearCollection(collection) {
      localStorage.setItem(collection, null);
  }

  getFromLocalStorage(collection) {
      return JSON.parse(localStorage.getItem(collection));
  }

}