import { Module } from '@nestjs/common';
import { AppConfigService } from './app.config.service';

@Module({
  providers: [
    {
      provide: AppConfigService,
      useValue: new AppConfigService('.env'),
    },
  ],
  exports: [AppConfigService],
})
export class ConfigModule {}
