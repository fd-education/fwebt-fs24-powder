import { Controller, Get } from '@nestjs/common';
import { ScoreboardResponse } from '@powder/common';

@Controller('scoreboard')
export class ScoreboardController {
  @Get()
  getScoreboard(): ScoreboardResponse {
    return {} as ScoreboardResponse;
  }
}
