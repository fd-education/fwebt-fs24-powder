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
  timestamp: number;
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

export type ChallengeRequest = {
  name: string,
  difficulty: Difficulty,
}

/**
 * Levels of difficulty of the game.
 * Controls how many colors are in the game and how many points are rewarded.
 */
export enum Difficulty {
  NORMAL = 5,
  HARD = 7
}

export enum GameProgressStates {
  initial = 'initial',
  started = 'started',
  paused = 'paused',
  ended = 'ended',
  lost = 'lost',
}

export enum ChatEvents{
  CHAT_MESSAGE = 'chat_message',
  CHAT_HISTORY = 'chat_history'
}
