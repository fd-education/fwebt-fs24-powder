import { IsNotEmpty, IsString } from 'class-validator';

export class GetScoreboardDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
