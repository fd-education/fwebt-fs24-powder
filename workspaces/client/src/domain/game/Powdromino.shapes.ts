export type PowdrominoShape = boolean[][];

export interface PowdrominoObject{
  I: {shape: PowdrominoShape},
  J: {shape: PowdrominoShape},
  L: {shape: PowdrominoShape},
  Z: {shape: PowdrominoShape},
  S: {shape: PowdrominoShape},
  O: {shape: PowdrominoShape},
  T: {shape: PowdrominoShape},
}

export const POWDROMINOS: PowdrominoObject = {
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