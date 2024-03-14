import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Score {
  @Prop({
    required: true,
    immutable: true,
    type: String,
    default: () => {
      return uuidv4();
    },
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
    type: Date,
  })
  timestamp: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
