export type BoardType = (PowdrominoTypes | VoidCell)[][];

export enum PowdrominoTypes {
  I = 'I',
  J = 'J',
  L = 'L',
  Z = 'Z',
  S = 'S',
  O = 'O',
  T = 'T'
}

export enum VoidCell {
  VOID = '-'
}