import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  ChallengeRequest,
  ChatEvents,
  ChatMessage,
  Difficulty,
  GameProgressStates,
  MultiplayerEvents,
  PowderNamespace,
} from '@powder/common';
import { Server, Socket } from 'socket.io';
import { ChatsService } from 'src/data/chats/chats.service';
import { Player } from 'src/domain/player/player';

@WebSocketGateway({
  namespace: PowderNamespace,
})
export class PowderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  connectedPlayers = new Map<string, Player>();
  playerPairs = new Map<string, string>();
  normalWaiting: Player = null;
  hardWaiting: Player = null;

  queues = new Map<Difficulty, Player>();

  constructor(private chatsService: ChatsService) {}

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

    const normalWaiting = this.queues.get(Difficulty.NORMAL);
    const hardWaiting = this.queues.get(Difficulty.HARD);

    if (normalWaiting?.socket.id === client.id) {
      this.normalWaiting === null;
    }

    if (hardWaiting?.socket.id === client.id) {
      this.hardWaiting === null;
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
    @MessageBody() challenge: ChallengeRequest,
  ) {
    const player = this.connectedPlayers.get(client.id);
    player.name = challenge.name;
    this.connectedPlayers.set(client.id, player);

    if (
      challenge.difficulty === Difficulty.NORMAL &&
      !this.queues.has(Difficulty.NORMAL)
    ) {
      this.queues.set(Difficulty.NORMAL, player);
    } else if (
      challenge.difficulty === Difficulty.HARD &&
      !this.queues.has(Difficulty.HARD)
    ) {
      this.queues.set(Difficulty.HARD, player);
    } else {
      const opponent = this.queues.get(challenge.difficulty);

      this.playerPairs.set(opponent.socket.id, client.id);
      this.playerPairs.set(client.id, opponent.socket.id);

      opponent.socket.emit(MultiplayerEvents.START);
      client.emit(MultiplayerEvents.START);

      this.queues.delete(challenge.difficulty);
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
    if(progress === GameProgressStates.ended) {    
      this.queues.forEach((player, diff) => {
        if (player.socket.id === client.id) {
          this.queues.delete(diff);
        }
      });
    }
    
    const opponentId = this.playerPairs.get(client.id);
    if (!opponentId) return;

    this.connectedPlayers
      .get(opponentId)
      .socket.emit(MultiplayerEvents.PROGRESS, progress);
  }

  @SubscribeMessage(ChatEvents.CHAT_HISTORY)
  async handleChatHistory(@ConnectedSocket() client: Socket): Promise<void> {
    const chatHistory = await this.chatsService.findAll();
    client.emit(ChatEvents.CHAT_HISTORY, chatHistory);
  }

  @SubscribeMessage(ChatEvents.CHAT_MESSAGE)
  async handleChatMessage(@MessageBody() message: ChatMessage) {
    this.server.emit(ChatEvents.CHAT_MESSAGE, message);

    await this.chatsService.create(message);
  }
}
