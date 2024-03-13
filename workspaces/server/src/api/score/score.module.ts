import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';

@Module({
  controllers: [ScoreController],
})
export class ScoreModule {}
