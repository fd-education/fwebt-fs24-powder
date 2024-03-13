import { Controller, Get, Query } from '@nestjs/common';
import { ScoreboardResponse } from '@powder/common';

@Controller('scoreboard')
export class ScoreboardController {
  @Get()
  getScoreboard(@Query('name') name: string): ScoreboardResponse {
    return {
      ranking: [
        {
          id: '1',
          name: 'johndoe',
          score: '1010',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '2',
          name: 'johndoe',
          score: '1009',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '3',
          name: 'johndoe',
          score: '1008',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '4',
          name: 'johndoe',
          score: '1007',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '5',
          name: 'johndoe',
          score: '1006',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '6',
          name: 'johndoe',
          score: '1005',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '7',
          name: 'johndoe',
          score: '1004',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '8',
          name: 'johndoe',
          score: '1003',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '9',
          name: 'johndoe',
          score: '1002',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '10',
          name: 'johndoe',
          score: '1001',
          timestamp: Date.now().toLocaleString(),
        },
        {
          id: '11',
          name,
          score: '999',
          timestamp: Date.now().toLocaleString(),
        },
      ],
    };
  }
}
