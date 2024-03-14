import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateScoreDto } from '../dto/CreateScoreDto';

export class RetrieveScoreDao extends CreateScoreDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  id: string;
}
