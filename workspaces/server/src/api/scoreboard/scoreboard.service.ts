import { Injectable } from '@nestjs/common';
import { ScoreboardResponse } from '@powder/common';
import { ScoresDataService } from 'src/data/scores/scores.service';

@Injectable()
export class ScoreboardApiService {
  constructor(private scoresDataService: ScoresDataService) {}

  async getScoreboard(playername: string): Promise<ScoreboardResponse> {
    const scores = await this.scoresDataService.findTopTen();

    if (!scores.map((s) => s.name).includes(playername)) {
      const playerScore = await this.scoresDataService.findByPlayer(playername);

      if (playerScore !== null) scores.push(playerScore);
    }

    return {
      ranking: scores.map((s) => ({ ...s, timestamp: s.timestamp.toString() })),
    };
  }
}
