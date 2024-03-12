export type BoardType = BlockType[][];
export type BlockType = BlockName | VoidCell;
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
