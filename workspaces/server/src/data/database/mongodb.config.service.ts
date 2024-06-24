import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { AppConfigService } from 'src/common/config/app.config.service';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: AppConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.mongoUri,
      retryWrites: true,
      appName: this.configService.appName,
      writeConcern: {
        w: 'majority',
      },
    };
  }
}
