import { Controller, Post } from '@nestjs/common';
import { ScoreResponse } from '@powder/common';

@Controller('score')
export class ScoreController {
  @Post()
  createScore(): ScoreResponse {
    return {} as ScoreResponse;
  }
}
