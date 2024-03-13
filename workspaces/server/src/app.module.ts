import { Module } from '@nestjs/common';
import { ScoreController } from './api/score/score.controller';
import { ScoreboardModule } from './api/scoreboard/scoreboard.module';
import { ScoreModule } from './api/score/score.module';

@Module({
  imports: [ScoreModule, ScoreboardModule],
  controllers: [ScoreController],
  providers: [],
})
export class AppModule {}
