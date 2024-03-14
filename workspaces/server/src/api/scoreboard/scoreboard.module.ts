import { Module } from '@nestjs/common';
import { ScoreboardApiService } from './scoreboard.service';
import { ScoreboardController } from './scoreboard.controller';
import { ScoresModule } from 'src/data/scores/scores.module';

@Module({
  imports: [ScoresModule],
  providers: [ScoreboardApiService],
  controllers: [ScoreboardController],
})
export class ScoreboardModule {}
