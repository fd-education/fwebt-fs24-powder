import { Injectable } from '@nestjs/common';
import { ScoreRequest, ScoreResponse } from '@powder/common';
import { ScoresDataService } from 'src/data/scores/scores.service';

@Injectable()
export class ScoreApiService {
  constructor(private scoresDataService: ScoresDataService) {}

  async persistScore(scoreReq: ScoreRequest): Promise<ScoreResponse> {
    const response = await this.scoresDataService.create(scoreReq);

    const { id, name, score, timestamp } = response;

    return {
      id,
      name,
      score,
      timestamp: timestamp.toString(),
    };
  }
}
