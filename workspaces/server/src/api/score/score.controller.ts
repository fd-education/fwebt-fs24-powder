import { Body, Controller, Post } from '@nestjs/common';
import { ScoreApiService } from './score.service';
import { CreateScoreDto } from 'src/domain/dto/CreateScoreDto';
import { ScoreboardApiService } from '../scoreboard/scoreboard.service';
import { RetrieveScoreboardDao } from 'src/domain/dao/RetrieveScoreboardDao';

@Controller('score')
export class ScoreController {
  constructor(
    private readonly scoreApiService: ScoreApiService,
    private readonly scoreboardApiService: ScoreboardApiService,
  ) {}

  @Post()
  async createScore(
    @Body() score: CreateScoreDto,
  ): Promise<RetrieveScoreboardDao> {
    await this.scoreApiService.persistScore(score);

    return await this.scoreboardApiService.getScoreboard({ name: score.name });
  }
}
