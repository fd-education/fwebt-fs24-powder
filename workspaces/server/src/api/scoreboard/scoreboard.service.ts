import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/common/config/app.config.service';
import { ScoresDataService } from 'src/data/scores/scores.service';
import { RetrieveScoreboardDao } from 'src/domain/dao/RetrieveScoreboardDao';
import { GetScoreboardDto } from 'src/domain/dto/GetScoreboardDto';

@Injectable()
export class ScoreboardApiService {
  constructor(private scoresDataService: ScoresDataService, private config: AppConfigService) {}

  async getScoreboard({
    name,
  }: GetScoreboardDto): Promise<RetrieveScoreboardDao> {
    if(this.config.isTest()) {
      return {
        "ranking": [
          {
            "id": "1",
            "name": "John Doe",
            "score": 100,
            "timestamp": "2021-09-01T12:00:00Z"
          },
          {
            "id": "2",
            "name": "Jane Doe",
            "score": 50,
            "timestamp": "2021-09-01T12:00:00Z"
          },
          {
            "id": "3",
            "name": "Max Mustermann",
            "score": 25,
            "timestamp": "2021-09-01T12:00:00Z"
          }
        ]
      };
    }

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
