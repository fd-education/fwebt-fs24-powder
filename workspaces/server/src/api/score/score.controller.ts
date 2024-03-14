import { Body, Controller, Post } from '@nestjs/common';
import { ScoreRequest, ScoreResponse } from '@powder/common';
import { ScoreApiService } from './score.service';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreApiService: ScoreApiService) {}

  @Post()
  async createScore(@Body() score: ScoreRequest): Promise<ScoreResponse> {
    return await this.scoreApiService.persistScore(score);
  }
}
