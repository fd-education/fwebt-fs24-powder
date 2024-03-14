import { Injectable } from '@nestjs/common';
import { ScoresDataService } from 'src/data/scores/scores.service';
import { RetrieveScoreboardDao } from 'src/domain/dao/RetrieveScoreboardDao';
import { GetScoreboardDto } from 'src/domain/dto/GetScoreboardDto';

@Injectable()
export class ScoreboardApiService {
  constructor(private scoresDataService: ScoresDataService) {}

  async getScoreboard({
    name,
  }: GetScoreboardDto): Promise<RetrieveScoreboardDao> {
    const scores = await this.scoresDataService.findTopTen();

    if (!scores.map((s) => s.name).includes(name)) {
      const playerScore = await this.scoresDataService.findByPlayer(name);

      if (playerScore !== null) scores.push(playerScore);
    }

    return {
      ranking: scores,
    };
  }
}
