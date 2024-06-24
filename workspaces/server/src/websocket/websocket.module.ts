import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/common/config/config.module';
import { PowderGateway } from './powder.gateway';
import { ChatsModule } from 'src/data/chats/chats.module';

@Module({
  imports: [ConfigModule, ChatsModule],
  providers: [PowderGateway],
})
export class WebsocketModule {}
