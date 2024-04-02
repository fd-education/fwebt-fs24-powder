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
  waiting: Player = null;

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

    if (this.waiting && this.waiting.socket.id === client.id) {
      this.waiting === null;
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
    console.log(`Challenge from ${client.id}`);
    const player = this.connectedPlayers.get(client.id);
    player.name = playerName;
    this.connectedPlayers.set(client.id, player);

    if (!this.waiting) {
      this.waiting = new Player(client);
    } else {
      this.playerPairs.set(this.waiting.socket.id, client.id);
      this.playerPairs.set(client.id, this.waiting.socket.id);

      this.waiting.socket.emit(MultiplayerEvents.START, playerName);
      client.emit(MultiplayerEvents.START, this.waiting.name);
      this.waiting = null;
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

  @SubscribeMessage(MultiplayerEvents.SCORE)
  async handleMultiplayerScoreUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() score: any,
  ) {
    const opponentId = this.playerPairs.get(client.id);
    if (!opponentId) return;

    this.connectedPlayers
      .get(opponentId)
      .socket.emit(MultiplayerEvents.SCORE, score);
  }

  @SubscribeMessage(MultiplayerEvents.PROGRESS)
  async handleMultiplayerProgressUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() progress: any,
  ) {
    const opponentId = this.playerPairs.get(client.id);
    if (!opponentId) return;

    this.connectedPlayers
      .get(opponentId)
      .socket.emit(MultiplayerEvents.PROGRESS, progress);
  }
}
