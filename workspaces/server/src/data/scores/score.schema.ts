import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Score {
  @Prop({
    required: true,
    immutable: true,
  })
  id: string;

  @Prop({
    required: true,
    immutable: true,
  })
  name: string;

  @Prop({
    required: true,
    immutable: true,
  })
  score: number;

  @Prop({
    required: true,
    immutable: true,
  })
  timestamp: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
