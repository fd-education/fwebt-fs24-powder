import { Socket } from 'socket.io';

export class Player {
  private _socket: Socket;
  private _name: string;

  constructor(socket: Socket) {
    this._socket = socket;
    this._name = '';
  }

  set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get socket() {
    return this._socket;
  }
}
