import { BlockColor } from '../../blocks/BlockColor';
import { BoardType, VoidCell, BlockName } from '../../blocks/BlockName';
import { BlockInfo, blocks, BlockShape } from '../../blocks/BlockShapes';
import { powderConfig } from '../../config/PowderConfig';
import { Difficulty } from '../../enums/Difficulty';

const { BOARD_ROWS, BOARD_COLS, DESINTEGRATION } = powderConfig;

export const getEmptyBoard = (
  height = BOARD_ROWS * DESINTEGRATION
): BoardType => {
  return Array(height)
    .fill(null)
    .map(() => Array(BOARD_COLS * DESINTEGRATION).fill(VoidCell.VOID));
};

export const getRandomBlock = (difficulty: Difficulty): BlockInfo => {
  const blockNames = Object.values(BlockName);
  const name = blockNames[
    Math.floor(Math.random() * blockNames.length)
  ] as BlockName;

  // ensure that the difficulty is limited by the actual number of colors in the game
  const numberOfColors = Math.min(difficulty, Object.keys(BlockColor).length);
  const blockColors = Object.values(BlockColor);
  const color = blockColors[
    Math.floor(Math.random() * numberOfColors)
  ] as BlockColor;

  return {
    name,
    color,
    shape: blocks[name].shape,
  };
};

export const addShapeToBoard = (
  board: BoardType,
  block: BlockInfo,
  shape: BlockShape,
  shapeRow: number,
  shapeCol: number
): BoardType => {
  const boardClone = structuredClone(board) as BoardType;

  shape
    .filter((row) => row.some((hasBlock) => hasBlock))
    .forEach((row: boolean[], ri: number) => {
      row.forEach((hasBlock: boolean, ci: number) => {
        if (hasBlock && shapeRow + ri >= 0) {
          boardClone[shapeRow + ri][shapeCol + ci] = block.color;
        }
      });
    });

  return boardClone;
};

export const rotateBlockShape = (shape: BlockShape): BlockShape => {
  const shapeRows = shape.length;
  const shapeCols = shape[0].length;

  const rotatedPowdromino = Array(shapeRows)
    .fill(null)
    .map(() => Array(shapeCols).fill(false));

  for (let r = 0; r < shapeRows; r++) {
    for (let c = 0; c < shapeCols; c++) {
      rotatedPowdromino[c][shapeRows - 1 - r] = shape[r][c];
    }
  }

  return rotatedPowdromino;
};

export const getPreviewBlocks = (next: BlockInfo[]): BoardType[] => {
  if (!next) return;

  const boards: BoardType[] = [];

  next.forEach((block) => {
    const shape = block.shape.filter((row: boolean[]) =>
      row.some((hasBlock) => hasBlock)
    );

    const board = Array(shape.length)
      .fill(null)
      .map(() => Array(shape[0].length).fill(VoidCell.VOID));

    const previewBoard = addShapeToBoard(board, block, shape, 0, 0);
    boards.push(previewBoard);
  });

  return boards.reverse();
};
