import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoresModule } from 'src/data/scores/scores.module';
import { ScoreApiService } from './score.service';
import { ScoreboardApiService } from '../scoreboard/scoreboard.service';

@Module({
  imports: [ScoresModule],
  providers: [ScoreApiService, ScoreboardApiService],
  controllers: [ScoreController],
})
export class ScoreModule {}
