import { ScoreRequest } from '@powder/common';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsPositive,
} from 'class-validator';

export class CreateScoreDto implements ScoreRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;
}
