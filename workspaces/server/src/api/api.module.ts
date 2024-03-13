import { Module } from '@nestjs/common';
import { ScoreModule } from './score/score.module';
import { ScoreboardModule } from './scoreboard/scoreboard.module';

@Module({
  providers: [ScoreModule, ScoreboardModule],
  exports: [ScoreModule, ScoreboardModule],
})
export class ApiModule {}
