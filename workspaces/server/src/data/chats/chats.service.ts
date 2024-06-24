import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { ChatMessage } from '@powder/common';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(chat: ChatMessage): Promise<void> {
    await this.chatModel.create(chat);
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatModel
      .find({})
      .limit(100)
      .sort({ timestamp: -1 })
      .lean()
      .select(['-__v', '-_id']);
  }
}
