type Config = {
  BOARD_COLS: number;
  BOARD_ROWS: number;
  BASE_STANDARD_LOOP_SPEED: number;
  BASE_COLLISION_LOOP_SPEED: number;
  BASE_FASTDROP_LOOP_SPEED: number;
  DESINTEGRATION: Desintegration;
  SERVER_URL: string;
  SCORE_ENDPOINT: string;
  SCOREBOARD_ENDPOINT: string;
};

export enum Desintegration {
  ONE = 1,
  THREE = 3,
  FIVE = 5,
  TEN = 10,
}

export const powderConfig: Config = {
  BOARD_COLS: 10,
  BOARD_ROWS: 20,
  BASE_STANDARD_LOOP_SPEED: 300,
  BASE_COLLISION_LOOP_SPEED: 200,
  BASE_FASTDROP_LOOP_SPEED: 50,
  DESINTEGRATION: Desintegration.THREE,
  SERVER_URL: 'http://localhost:3000',
  SCORE_ENDPOINT: 'score',
  SCOREBOARD_ENDPOINT: 'scoreboard',
};
