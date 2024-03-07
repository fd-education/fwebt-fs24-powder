type Config = {
  BOARD_COLS: number;
  BOARD_ROWS: number;
  STANDARD_LOOP_SPEED: number;
  COLLISION_LOOP_SPEED: number;
  FASTDROP_LOOP_SPEED: number;
};

export const PowderConfig: Config = {
  BOARD_COLS: 10,
  BOARD_ROWS: 20,
  STANDARD_LOOP_SPEED: 300,
  COLLISION_LOOP_SPEED: 200,
  FASTDROP_LOOP_SPEED: 50,
};
