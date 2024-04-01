import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';
import { BoardStateVars } from './boardState/boardStateStore';
import { ChatEvents, MultiplayerEvents } from '@powder/common';
import { ScoreState } from './scoreStore';

interface WebsocketState {
  isConnected: boolean;
  socket: Socket;
  open: () => void;
  close: () => void;
  emitChatMessage: (text: string) => void;
  registerChatHandler: (handler: (text: string) => void) => void;
  emitGameChallenge: (playername: string) => void,
  emitBoardState: (state: Partial<BoardStateVars>) => void;
  emitGameScore: (score: Partial<ScoreState>) => void;
  registerGameStartHandler: (handler: (playerName: string) => void) => void;
  registerGameStateHandler: (handler: (state: Partial<BoardStateVars>) => void) => void;
  registerGameDisconnectHandler: (handler: () => void) => void;
  registerGameScoreHandler: (handler: (score: Partial<ScoreState>) => void) => void;
  removeGameHandlers: () => void;
  removeChatHandler: () => void;
}

export const useWebsocketStore = create<WebsocketState>()((set, get) => ({
  isConnected: false,
  socket: null,
  open: () => {
    const socket = io('http://localhost:3000/powder', {
      autoConnect: false,
      transports: ['websocket'],
    });

    socket.connect();

    socket.on('connect', () => {
      set({
        isConnected: true,
        socket
      });
    });

    socket.on('disconnect', () => {
      set({
        isConnected: false,
        socket: null
      });
    });

    socket.connect();
  },
  close: () => {
    set((state) => {
      if (!state.isConnected) return;

      state.socket.close();
      return {};
    })
  },
  emitChatMessage: (text) => {
    if (!get().isConnected) return;

    get().socket.emit('chat', text);
  },
  emitGameChallenge: (playerName: string) => {
    if (!get().isConnected) return;

    get().socket.emit(MultiplayerEvents.CHALLENGE, playerName);
  },
  emitBoardState: (state: Partial<BoardStateVars>) => {
    if (!get().isConnected) return;

    get().socket.emit(MultiplayerEvents.UPDATE, state);
  },
  emitGameScore: (score: Partial<ScoreState>) => {
    if(!get().isConnected) return;

    get().socket.emit(MultiplayerEvents.SCORE, score);
  },
  registerChatHandler: (handler: (text: string) => void) => {
    if (!get().isConnected) return;

    get().socket.on(ChatEvents.RECEIVE, (text: string) => handler(text));
  },
  registerGameStartHandler: (handler: (playerName: string) => void) => {
    if (!get().isConnected) return;

    get().socket.on(MultiplayerEvents.START, (playerName: string) => handler(playerName))
  },
  registerGameStateHandler: (handler: (state: Partial<BoardStateVars>) => void) => {
    if (!get().isConnected) return;

    get().socket.on(MultiplayerEvents.UPDATE, (state: Partial<BoardStateVars>) => handler(state));
  },
  registerGameDisconnectHandler: (handler: () => void) => {
    if (!get().isConnected) return;

    get().socket.on(MultiplayerEvents.DISCONNECT, () => handler());
  },
  registerGameScoreHandler: (handler: (score: Partial<ScoreState>) => void) => {
    if (!get().isConnected) return;

    get().socket.on(MultiplayerEvents.SCORE, (score: Partial<ScoreState>) => handler(score));
  },
  removeGameHandlers: () => {
    if (!get().isConnected) return;

    get().socket.removeAllListeners(MultiplayerEvents.START);
    get().socket.removeAllListeners(MultiplayerEvents.UPDATE);
    get().socket.removeAllListeners(MultiplayerEvents.DISCONNECT);
  },
  removeChatHandler: () => {
    get().socket.removeAllListeners(ChatEvents.RECEIVE);
  }
}
));