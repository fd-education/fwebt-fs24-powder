import { Module } from '@nestjs/common';
import { ScoresDataService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
  providers: [ScoresDataService],
  exports: [ScoresDataService],
})
export class ScoresModule {}
