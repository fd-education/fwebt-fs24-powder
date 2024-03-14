export type ScoreRequest = {
  name: string,
  score: number,
  timestamp: Date
};

export type ScoreResponse = {
  id: string,
} & ScoreRequest;

export type ScoreboardResponse = {
  ranking: ScoreResponse[]
};

export enum Stage{
  PROD = 'prod',
  TEST = 'test',
  DEV = 'dev'
}