import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/common/config/config.module';
import { PowderGateway } from './powder.gateway';

@Module({
  imports: [ConfigModule],
  providers: [PowderGateway],
})
export class WebsocketModule {}
