import { Module } from '@nestjs/common';
import { ScoreboardModule } from './api/scoreboard/scoreboard.module';
import { ScoreModule } from './api/score/score.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [ConfigModule, ScoreModule, ScoreboardModule],
})
export class AppModule {}
