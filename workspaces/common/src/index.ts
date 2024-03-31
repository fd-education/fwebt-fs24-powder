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

export enum MultiplayerEvents{
  CHALLENGE = 'challenge',
  START = 'start',
  UPDATE = 'update',
  DISCONNECT = 'disconnect',
}

export enum ChatEvents{
  RECEIVE = 'receive',
  SEND = 'send'
}