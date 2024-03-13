import { BlockColor } from './BlockColor';
import { BlockName } from './BlockName';

export type BlockShape = boolean[][];

export type SlimBlockInfo = {
  name: BlockName;
  color: BlockColor;
};

export type BlockInfo = SlimBlockInfo & {
  shape: BlockShape;
};

export interface BlockShapeObject {
  I: BlockInfo;
  J: BlockInfo;
  L: BlockInfo;
  Z: BlockInfo;
  S: BlockInfo;
  O: BlockInfo;
  T: BlockInfo;
}

export const scaleBlockShape = (shape: BlockShape, factor: number) => {
  const scaledShape: BlockShape = [];

  for (const row of shape) {
    const scaledRow: boolean[] = [];

    for (const item of row) {
      scaledRow.push(...Array(factor).fill(item));
    }

    scaledShape.push(...Array(factor).fill(scaledRow));
  }

  return scaledShape;
};

export const blocks: BlockShapeObject = {
  I: {
    name: BlockName.I,
    shape: [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
    ],
    color: BlockColor.RED,
  },
  J: {
    name: BlockName.J,
    shape: [
      [false, false, true],
      [false, false, true],
      [false, true, true],
    ],
    color: BlockColor.RED,
  },
  L: {
    name: BlockName.L,
    shape: [
      [true, false, false],
      [true, false, false],
      [true, true, false],
    ],
    color: BlockColor.RED,
  },
  Z: {
    name: BlockName.Z,
    shape: [
      [true, true, false],
      [false, true, true],
      [false, false, false],
    ],
    color: BlockColor.RED,
  },
  S: {
    name: BlockName.S,
    shape: [
      [false, true, true],
      [true, true, false],
      [false, false, false],
    ],
    color: BlockColor.RED,
  },
  O: {
    name: BlockName.O,
    shape: [
      [true, true],
      [true, true],
    ],
    color: BlockColor.RED,
  },
  T: {
    name: BlockName.T,
    shape: [
      [false, true, false],
      [true, true, true],
      [false, false, false],
    ],
    color: BlockColor.RED,
  },
};
