import { ArrayMaxSize, IsArray } from 'class-validator';
import { RetrieveScoreDao } from './RetrieveScoreDao';

export class RetrieveScoreboardDao {
  @IsArray()
  @ArrayMaxSize(11)
  ranking: RetrieveScoreDao[];
}
