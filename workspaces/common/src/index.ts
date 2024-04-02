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

export type ChatMessage = {
  session: string;
  name: string;
  timestamp: string;
  text: string;
}

export enum Stage{
  PROD = 'prod',
  TEST = 'test',
  DEV = 'dev'
}

export const PowderNamespace = 'powder';

export enum MultiplayerEvents{
  CHALLENGE = 'game_challenge',
  START = 'game_start',
  UPDATE = 'game_update',
  SCORE = 'game_score',
  PROGRESS = 'game_progress',
  DISCONNECT = 'game_disconnect',
}

export enum ChatEvents{
  CHAT_MESSAGE = 'chat_message',
}

