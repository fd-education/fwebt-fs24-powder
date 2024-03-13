import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../../common/config/app.config.service';
import { ConfigModule } from '../../common/config/config.module';
import { MongodbConfigService } from './mongodb.config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
      inject: [AppConfigService],
    }),
  ],
})
export class DatabaseModule {}
