import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatMessage } from '@powder/common';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Chat implements ChatMessage {
  @Prop({
    unique: true,
    immutable: true,
    default: function genUUID() {
      return uuidv4();
    },
  })
  id: string;

  @Prop({
    required: true,
    immutable: true,
  })
  session: string;

  @Prop({
    required: true,
    immutable: true,
  })
  name: string;

  @Prop({
    required: true,
    immutable: true,
  })
  text: string;

  @Prop({
    required: true,
    immutable: true,
  })
  timestamp: number;
}

export const ChatsSchema = SchemaFactory.createForClass(Chat);
