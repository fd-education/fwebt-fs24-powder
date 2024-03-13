import { Module } from '@nestjs/common';
import { ScoreboardService } from './scoreboard.service';
import { ScoreboardController } from './scoreboard.controller';

@Module({
  providers: [ScoreboardService],
  controllers: [ScoreboardController],
})
export class ScoreboardModule {}
