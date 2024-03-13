import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
  providers: [ScoresService],
})
export class ScoresModule {}
