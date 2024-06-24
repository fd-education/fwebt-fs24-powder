import { Module } from '@nestjs/common';
import { ScoreModule } from './score/score.module';
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { ConfigModule } from 'src/common/config/config.module';
import { AppConfigService } from 'src/common/config/app.config.service';

@Module({
  providers: [ScoreModule, ScoreboardModule],
  exports: [ScoreModule, ScoreboardModule],
})
export class ApiModule {}
