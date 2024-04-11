import React from 'react';
import { ChatMessage } from '@powder/common';

type OwnChatMessage = Omit<ChatMessage, 'session' | 'name'>;
type ForeignChatMessage = Omit<ChatMessage, 'session'>;

export const ChatBubbleSent = ({ timestamp, text }: OwnChatMessage) => {
  return (
    <div className='chat chat-end'>
      <div className='chat-bubble bg-chat-bubble-sent text-black break-words safe-break-word'>
        <div className='chat-header opacity-50'>
          <time className='text-xs opacity-70'>
            {' '}
            {new Date(timestamp).toLocaleTimeString('de-CH', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </time>
        </div>
        {text}
      </div>
    </div>
  );
};

export const ChatBubbleReceived = ({ text, name, timestamp }: ForeignChatMessage) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-bubble bg-chat-bubble-received text-white break-words safe-break-word'>
        <div className='chat-header opacity-50'>
          {name}
          <time className='text-xs opacity-70'>
            {' '}
            {new Date(timestamp).toLocaleTimeString('de-CH', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </time>
        </div>
        {text}
      </div>
    </div>
  );
};
