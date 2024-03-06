export type BlockShape = boolean[][];

export interface BlockShapeObject{
  I: {shape: BlockShape},
  J: {shape: BlockShape},
  L: {shape: BlockShape},
  Z: {shape: BlockShape},
  S: {shape: BlockShape},
  O: {shape: BlockShape},
  T: {shape: BlockShape},
}

export const blockShapes: BlockShapeObject = {
  I: {
    shape: [
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false],
      [false, true, false, false]
    ]
  },
  J: {
    shape: [
      [false, false, true],
      [false, false, true],
      [false, true, true]
    ]
  },
  L: {
    shape: [
      [true, false, false],
      [true, false, false],
      [true, true, false]
    ]
  },
  Z: {
    shape: [
      [true, true, false],
      [false, true, true],
      [false, false, false]
    ]
  },
  S: {
    shape: [
      [false, true, true],
      [true, true, false],
      [false, false, false]
    ]
  },
  O: {
    shape: [
      [true, true],
      [true, true]
    ]
  },
  T: {
    shape: [
      [false, true, false],
      [true, true, true],
      [false, false, false]
    ]
  },
}