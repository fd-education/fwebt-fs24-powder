export type ScoreRequest = {
  name: string,
  score: number,
  timestamp: string
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

export const PowderNamespace = 'powder';