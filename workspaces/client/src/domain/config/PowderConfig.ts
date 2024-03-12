type Config = {
  BOARD_COLS: number;
  BOARD_ROWS: number;
  STANDARD_LOOP_SPEED: number;
  COLLISION_LOOP_SPEED: number;
  FASTDROP_LOOP_SPEED: number;
  DESINTEGRATION: number;
};

export const powderConfig: Config = {
  BOARD_COLS: 10,
  BOARD_ROWS: 20,
  STANDARD_LOOP_SPEED: 100,
  COLLISION_LOOP_SPEED: 75,
  FASTDROP_LOOP_SPEED: 20,
  // Currently supports 1, 3, 5, 10
  // Add more options to switch statements in workspace/client/src/components/game/board/Cell.tsx
  DESINTEGRATION: 3,
};
