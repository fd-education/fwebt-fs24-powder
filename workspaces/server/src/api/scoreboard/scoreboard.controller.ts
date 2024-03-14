import { Controller, Get, Query } from '@nestjs/common';
import { ScoreboardResponse } from '@powder/common';
import { ScoreboardApiService } from './scoreboard.service';

@Controller('scoreboard')
export class ScoreboardController {
  constructor(private readonly scoreboardApiService: ScoreboardApiService) {}

  @Get()
  async getScoreboard(
    @Query('name') name: string,
  ): Promise<ScoreboardResponse> {
    return await this.scoreboardApiService.getScoreboard({ name });
  }
}
