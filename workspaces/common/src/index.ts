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
  CHALLENGE = 'game_challenge',
  START = 'game_start',
  UPDATE = 'send_game_update',
  DISCONNECT = 'game_disconnect',
}

export enum ChatEvents{
  RECEIVE = 'chat_receive',
  SEND = 'chat_send'
}