export type BoardType = (BlockName | VoidCell)[][];

export enum BlockName {
  I = 'I',
  J = 'J',
  L = 'L',
  Z = 'Z',
  S = 'S',
  O = 'O',
  T = 'T',
}

export enum VoidCell {
  VOID = '-',
}
