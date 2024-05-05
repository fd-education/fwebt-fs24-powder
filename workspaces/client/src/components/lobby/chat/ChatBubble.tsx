import React from 'react';
import { ChatMessage } from '@powder/common';

type OwnChatMessage = Omit<ChatMessage, 'session' | 'name'>;
type ForeignChatMessage = Omit<ChatMessage, 'session'>;

// Diese beiden Komponenten liessen sich auch generalisieren.
// Wobei ich diese so belassen würde (beim 1. Mal schreiben, beim 2. Mal kopieren, beim 3. Mal generalisieren)
export const ChatBubbleSent = ({ timestamp, text }: OwnChatMessage) => {
  return (
    <div className='chat chat-end'>
      <div className='chat-bubble bg-chat-bubble-sent text-black break-words safe-break-word'>
        <div className='chat-header opacity-50'>
          <time className='text-xs opacity-70'>
            // Semantisch deutlicher ("non-breaking space")
            &nbsp;
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

export const ChatBubbleReceived = ({
  text,
  name,
  timestamp,
}: ForeignChatMessage) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-bubble bg-chat-bubble-received text-white break-words safe-break-word'>
        <div className='chat-header opacity-50'>
          {name}
          <time className='text-xs opacity-70'>
            // Semantisch deutlicher ("non-breaking space")
            &nbsp;
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
