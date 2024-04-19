import React, { useEffect, useState } from 'react';
import { Panel } from '../util/Panel';
import { PanelHeading } from '../util/PanelHeading';
import { useWebsocketStore } from '../../domain/state/websocketStateStore';
import { ChatMessage } from '@powder/common';
import { ChatBubbleSent, ChatBubbleReceived } from './chat/ChatBubble';
import { usePlayerStore } from '../../domain/state/playerNameStore';
import { SendIcon } from './chat/SendIcon';

export const LobbyChat = () => {
  const {
    isConnected,
    registerChatHistoryHandler,
    registerChatHandler,
    emitChatHistory,
    emitChatMessage,
    removeChatHandler,
  } = useWebsocketStore();
  const { sessionId, playerName } = usePlayerStore();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);

  useEffect(() => {
    registerChatHistoryHandler((msgs: ChatMessage[]) => {
      msgs?.length > 0 ? setMessages(msgs) : setMessages([]);
    });

    return () => {
      removeChatHandler();
    };
  }, [isConnected]);

  useEffect(() => {
    registerChatHandler((msg: ChatMessage) => {
      messages?.length > 0
        ? setMessages([msg, ...messages])
        : setMessages([msg]);
    });

    emitChatHistory();
    return () => {
      removeChatHandler();
    };
  }, [isConnected, messages]);

  const sendMessage = () => {
    if (message === '') return;

    emitChatMessage({
      session: sessionId,
      name: playerName,
      text: message,
      timestamp: Date.now(),
    });

    setMessage('');
  };

  const handleKeypress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <Panel height='h-full' paddingX='px-6'>
      <PanelHeading text='Lobby Chat' />
      <div className='last:border-b-0 w-full h-full overflow-y-auto pr-3 flex flex-col-reverse'>
        // Hier können auch optional Chains angewendet werden
        {messages?.map((msg, index) => {
            return msg.session === sessionId ? (
              <ChatBubbleSent
                key={index}
                text={msg.text}
                timestamp={msg.timestamp}
              />
            ) : (
              <ChatBubbleReceived
                key={index}
                text={msg.text}
                timestamp={msg.timestamp}
                name={msg.name}
              />
            );
          })}
      </div>
      <div className='divider w-full dark:before:bg-the_game_gray dark:after:bg-the_game_gray' />
      <div className='flex space-x-3 w-full'>
        <input
          id='chat-input'
          type='text'
          value={message}
          placeholder={'Write here...'}
          className='input w-full flex-1 h-10 rounded-none bg-white'
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => handleKeypress(e as unknown as KeyboardEvent)}
        />

        <button
          className='w-10 h-10 bg-button-color rounded-full'
          onClick={() => {
            sendMessage();
          }}
        >
          <SendIcon />
        </button>
      </div>
    </Panel>
  );
};
