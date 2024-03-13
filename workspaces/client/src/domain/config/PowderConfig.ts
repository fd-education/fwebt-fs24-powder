type Config = {
  BOARD_COLS: number;
  BOARD_ROWS: number;
  BASE_STANDARD_LOOP_SPEED: number;
  BASE_COLLISION_LOOP_SPEED: number;
  BASE_FASTDROP_LOOP_SPEED: number;
  DESINTEGRATION: number;
};

export const powderConfig: Config = {
  BOARD_COLS: 10,
  BOARD_ROWS: 20,
  BASE_STANDARD_LOOP_SPEED: 300,
  BASE_COLLISION_LOOP_SPEED: 200,
  BASE_FASTDROP_LOOP_SPEED: 50,
  // Currently supports 1, 3, 5, 10
  // Add more options to switch statements in workspace/client/src/components/game/board/Cell.tsx
  DESINTEGRATION: 3,
};
