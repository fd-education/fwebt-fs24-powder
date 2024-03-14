import { Injectable } from '@nestjs/common';
import { ScoresDataService } from 'src/data/scores/scores.service';
import { RetrieveScoreDao } from 'src/domain/dao/RetrieveScoreDao';
import { CreateScoreDto } from 'src/domain/dto/CreateScoreDto';

@Injectable()
export class ScoreApiService {
  constructor(private scoresDataService: ScoresDataService) {}

  async persistScore(scoreReq: CreateScoreDto): Promise<RetrieveScoreDao> {
    const response = await this.scoresDataService.create(scoreReq);

    const { id, name, score, timestamp } = response;

    return {
      id,
      name,
      score,
      timestamp: new Date(timestamp.toString()),
    };
  }
}
