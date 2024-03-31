import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MultiplayerEvents, PowderNamespace } from '@powder/common';
import { Server, Socket } from 'socket.io';
import { Player } from 'src/domain/player/player';

@WebSocketGateway({
  namespace: PowderNamespace,
})
export class PowderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  connectedPlayers = new Map<string, Player>();
  playerPairs = new Map<string, string>();
  waiting = new Array<string>();

  async handleConnection(client: Socket): Promise<any> {
    console.log(
      `Client ${client.id} connected to ${PowderNamespace}-namespace`,
    );

    this.connectedPlayers.set(client.id, new Player(client));
  }

  async handleDisconnect(client: Socket) {
    console.log(
      `Client ${client.id} disconnected from ${PowderNamespace}-namespace`,
    );
    const opponentId = this.playerPairs.get(client.id);

    if (this.playerPairs.has(client.id)) {
      this.playerPairs.delete(client.id);
      this.playerPairs.delete(opponentId);
    }

    if (this.connectedPlayers.has(opponentId)) {
      this.connectedPlayers
        .get(opponentId)
        .socket.emit(MultiplayerEvents.DISCONNECT);
    }
  }

  @SubscribeMessage(MultiplayerEvents.CHALLENGE)
  async handleMultiplayerChallenge(
    @ConnectedSocket() client: Socket,
    @MessageBody() playerName: string,
  ) {
    const player = this.connectedPlayers.get(client.id);
    player.name = playerName;
    this.connectedPlayers.set(client.id, player);

    if (this.waiting.length === 0) {
      this.waiting.push(client.id);
    } else {
      const opponentId = this.waiting.pop();
      const opponent = this.connectedPlayers.get(opponentId);

      opponent.socket.emit(MultiplayerEvents.START, playerName);
      client.emit(MultiplayerEvents.START, opponent.name);
    }
  }

  @SubscribeMessage(MultiplayerEvents.UPDATE)
  async handleMultiplayerUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() state: any,
  ) {
    const opponentId = this.playerPairs.get(client.id);
    if (!opponentId) return;

    this.connectedPlayers
      .get(opponentId)
      .socket.emit(MultiplayerEvents.UPDATE, state);
  }
}
