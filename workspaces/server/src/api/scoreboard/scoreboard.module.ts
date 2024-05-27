import { Module } from '@nestjs/common';
import { ScoreboardApiService } from './scoreboard.service';
import { ScoreboardController } from './scoreboard.controller';
import { ScoresModule } from 'src/data/scores/scores.module';
import { ConfigModule } from 'src/common/config/config.module';
import { AppConfigService } from 'src/common/config/app.config.service';

@Module({
  imports: [ScoresModule, ConfigModule],
  providers: [ScoreboardApiService],
  controllers: [ScoreboardController],
})
export class ScoreboardModule {}
