export type ScoreResponse = {
  id: string,
  name: string,
  score: number,
  timestamp: string
};

export type ScoreRequest = {
  name: string,
  score: number,
  timestamp: Date
};

export type ScoreboardResponse = {
  ranking: ScoreResponse[]
};

export enum Stage{
  PROD = 'prod',
  TEST = 'test',
  DEV = 'dev'
}