type PlayerKeys = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';
type OpponentKeys = 's' | 'w' | 'a' | 'd';

export type KeyMap = {
  moveLeft: PlayerKeys | OpponentKeys;
  moveRight: PlayerKeys | OpponentKeys;
  rotate: PlayerKeys | OpponentKeys;
  accelerate: PlayerKeys | OpponentKeys;
};

export const playerKeyMap: KeyMap = {
  moveLeft: 'ArrowLeft',
  moveRight: 'ArrowRight',
  rotate: 'ArrowUp',
  accelerate: 'ArrowDown',
};

export const opponentKeyMap: KeyMap = {
  moveLeft: 'a',
  moveRight: 'd',
  rotate: 'w',
  accelerate: 's',
};
