import { Controller, Post } from '@nestjs/common';
import { ScoreResponse } from '@powder/common';

@Controller('score')
export class ScoreController {
  @Post()
  createScore(): ScoreResponse {
    return {
      id: '1',
      name: 'johndoe',
      score: '1000',
      timestamp: Date.now().toLocaleString(),
    };
  }
}
