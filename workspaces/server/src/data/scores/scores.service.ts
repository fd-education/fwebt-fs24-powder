import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';
import { Model } from 'mongoose';
import { ScoreRequest } from '@powder/common';

@Injectable()
export class ScoresDataService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async create(score: ScoreRequest): Promise<Score> {
    const created = new this.scoreModel(score);
    return created.save();
  }

  async findTopTen(): Promise<Score[]> {
    return this.scoreModel
      .find()
      .sort({ score: 'desc' })
      .limit(10)
      .lean()
      .select(['-__v', '-_id'])
      .exec();
  }

  async findByPlayer(player: string): Promise<Score | null> {
    const score = this.scoreModel
      .find({ name: player })
      .sort({ score: 'desc' })
      .limit(1)
      .lean()
      .select(['-__v', '-_id'])
      .exec();

    if (score && this.isScore(score)) {
      return score as Score;
    }

    return null;
  }

  private isScore(score: any): score is Score {
    return (
      'id' in score &&
      'name' in score &&
      'score' in score &&
      'timestamp' in score
    );
  }
}
