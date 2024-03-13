import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';
import { Model } from 'mongoose';
import { ScoreRequest } from '@powder/common';

@Injectable()
export class ScoresService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>) {}

  async create(score: ScoreRequest): Promise<Score> {
    const created = new this.scoreModel(score);
    return created.save();
  }

  async findTopTen(): Promise<Score[]> {
    return this.scoreModel.find().sort({ score: 'desc' }).limit(10).exec();
  }

  async findByPlayer(player: string): Promise<Score | unknown> {
    return this.scoreModel
      .find({ name: player })
      .sort({ score: 'desc' })
      .limit(1)
      .exec();
  }
}
