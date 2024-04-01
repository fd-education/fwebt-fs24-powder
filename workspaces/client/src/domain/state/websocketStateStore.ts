import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';
import { BoardStateVars } from './boardState/boardStateStore';
import { ChatEvents, MultiplayerEvents } from '@powder/common';

interface WebsocketState {
  isConnected: boolean;
  socket: Socket;
  open: () => void;
  close: () => void;
  emitChatMessage: (text: string) => void;
  emitGameChallenge: (playername: string) => void,
  emitBoardState: (state: Partial<BoardStateVars>) => void;
  registerChatHandler: (handler: (text: string) => void) => void;
  registerGameStartHandler: (handler: (playerName: string) => void) => void;
  registerGameStateHandler: (handler: (state: Partial<BoardStateVars>) => void) => void;
  registerGameDisconnectHandler: (handler: () => void) => void;
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

    get().socket.emit(MultiplayerEvents.SEND_UPDATE, state);
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

    get().socket.on(MultiplayerEvents.RECEIVE_UPDATE, (state: Partial<BoardStateVars>) => handler(state));
  },
  registerGameDisconnectHandler: (handler: () => void) => {
    if (!get().isConnected) return;

    get().socket.on(MultiplayerEvents.DISCONNECT, () => handler());
  },
  removeGameHandlers: () => {
    if (!get().isConnected) return;

    get().socket.removeAllListeners(MultiplayerEvents.START);
    get().socket.removeAllListeners(MultiplayerEvents.RECEIVE_UPDATE);
    get().socket.removeAllListeners(MultiplayerEvents.DISCONNECT);
  },
  removeChatHandler: () => {
    get().socket.removeAllListeners(ChatEvents.RECEIVE);
  }
}
));