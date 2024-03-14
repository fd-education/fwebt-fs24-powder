import { Body, Controller, Post } from '@nestjs/common';
import { ScoreApiService } from './score.service';
import { CreateScoreDto } from 'src/domain/dto/CreateScoreDto';
import { RetrieveScoreDao } from 'src/domain/dao/RetrieveScoreDao';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreApiService: ScoreApiService) {}

  @Post()
  async createScore(@Body() score: CreateScoreDto): Promise<RetrieveScoreDao> {
    return await this.scoreApiService.persistScore(score);
  }
}
