import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PowderNamespace } from '@powder/common';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: PowderNamespace,
})
export class PowderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  async handleConnection(client: any): Promise<any> {
    console.log(
      `Client ${client.id} connected to ${PowderNamespace}-namespace`,
    );
  }

  async handleDisconnect(client: any) {
    console.log(
      `Client ${client.id} disconnected from ${PowderNamespace}-namespace`,
    );
  }
}
