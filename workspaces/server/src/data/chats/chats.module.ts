import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsService } from './chats.service';
import { Chat, ChatsSchema } from './chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatsSchema }]),
  ],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
