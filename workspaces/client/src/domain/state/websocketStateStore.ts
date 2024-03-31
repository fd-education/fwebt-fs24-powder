import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';
import { BoardStateVars } from './boardState/boardStateStore';

interface WebsocketState {
  isConnected: boolean;
  socket: Socket;
  open: () => void;
  close: () => void;

  emitChatMessage: (text: string) => void;
  emitBoardState: (state: Partial<BoardStateVars>) => void;
  registerChatHandler: () => void;
  registerGameStateHandler: () => void;
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
    emitBoardState: (state: Partial<BoardStateVars>) => {
      if(!get().isConnected) return;

      get().socket.emit('state', state);
    },
    registerChatHandler: () => {

    },
    registerGameStateHandler: () => {

    }
  }
));