import { Module } from '@nestjs/common';
import { ScoreboardModule } from './api/scoreboard/scoreboard.module';
import { ScoreModule } from './api/score/score.module';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './data/database/database.module';
import { ScoresModule } from './data/scores/scores.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    DatabaseModule,
    ScoresModule,
    ConfigModule,
    ScoreModule,
    ScoreboardModule,
    WebsocketModule,
  ],
})
export class AppModule {}
