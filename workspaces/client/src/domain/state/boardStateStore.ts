import { create } from 'zustand';
import { BlockName, BoardType, VoidCell } from '../blocks/BlockName';
import {
  BlockInfo,
  BlockShape,
  blocks,
  scaleBlockShape,
} from '../blocks/BlockShapes';
import { powderConfig } from '../config/PowderConfig';
import { useGamePhysics } from '../../hooks/useGamePhysics';
import { BlockColor } from '../blocks/BlockColor';

interface BoardState {
  board: BoardType;
  renderedBoard: BoardType;
  shapeRow: number;
  shapeCol: number;
  block: BlockInfo;
  shape: BlockShape;
  hasCollision: boolean;
  isSettling: boolean;
  nextBlocks: BlockInfo[];
  nextBlockShapes: BoardType[];
  initializeBoard: () => void;
  dropBlock: () => void;
  moveBlockLeft: () => void;
  moveBlockRight: () => void;
  rotateBlock: () => void;
  setIsSettling: (isSettling: boolean) => void;
  settleBlock: () => number[];
  nextRound: (removedLines: number, newBoard: BoardType) => boolean;
}

const { checkCollisions, desintegrateBlocks, checkPowdris } = useGamePhysics();
const { BOARD_ROWS, BOARD_COLS, DESINTEGRATION } = powderConfig;

export const getEmptyBoard = (
  height = BOARD_ROWS * DESINTEGRATION
): BoardType => {
  return Array(height)
    .fill(null)
    .map(() => Array(BOARD_COLS * DESINTEGRATION).fill(VoidCell.VOID));
};

export const getRandomBlock = (): BlockInfo => {
  const blockNames = Object.values(BlockName);
  const name = blockNames[
    Math.floor(Math.random() * blockNames.length)
  ] as BlockName;
  const blockColors = Object.values(BlockColor);
  const color = blockColors[
    Math.floor(Math.random() * blockColors.length)
  ] as BlockColor;

  return {
    name,
    color,
    shape: blocks[name].shape,
  };
};

const addShapeToBoard = (
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

const rotateBlockShape = (shape: BlockShape): BlockShape => {
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

export const useBoardStateStore = create<BoardState>((set) => ({
  board: [],
  renderedBoard: [],
  shapeRow: -1 * DESINTEGRATION,
  shapeCol: 3 * DESINTEGRATION,
  block: getRandomBlock(),
  shape: scaleBlockShape(blocks[BlockName.I].shape, DESINTEGRATION),
  nextBlocks: [],
  nextBlockShapes: [],
  hasCollision: false,
  isSettling: false,
  initializeBoard: () => {
    const firstBlock = getRandomBlock();
    const nextBlocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()];

    set({
      board: getEmptyBoard(),
      renderedBoard: addShapeToBoard(
        getEmptyBoard(),
        firstBlock,
        scaleBlockShape(firstBlock.shape, DESINTEGRATION),
        -1 * DESINTEGRATION,
        3 * DESINTEGRATION
      ),
      shapeRow: 0 * DESINTEGRATION,
      shapeCol: 3 * DESINTEGRATION,
      block: firstBlock,
      shape: scaleBlockShape(firstBlock.shape, DESINTEGRATION),
      nextBlocks,
      nextBlockShapes: getPreviewBlocks(nextBlocks),
      hasCollision: false,
      isSettling: false,
    });
  },
  dropBlock: () => {
    set((state) => {
      const updatedRow = state.shapeRow + 1;
      if (
        checkCollisions(state.board, state.shape, updatedRow, state.shapeCol)
      ) {
        return {
          hasCollision: true,
        };
      }

      const updatedBoard = addShapeToBoard(
        state.board,
        state.block,
        state.shape,
        updatedRow,
        state.shapeCol
      );

      return {
        renderedBoard: updatedBoard,
        shapeRow: updatedRow,
      };
    });
  },
  moveBlockLeft: () => {
    set((state) => {
      const willCollide = checkCollisions(
        state.board,
        state.shape,
        state.shapeRow,
        state.shapeCol - 1 * DESINTEGRATION
      );
      const updatedCol = willCollide
        ? state.shapeCol
        : state.shapeCol - 1 * DESINTEGRATION;
      const updatedBoard = addShapeToBoard(
        state.board,
        state.block,
        state.shape,
        state.shapeRow,
        updatedCol
      );

      return {
        renderedBoard: updatedBoard,
        shapeCol: updatedCol,
      };
    });
  },
  moveBlockRight: () => {
    set((state) => {
      const willCollide = checkCollisions(
        state.board,
        state.shape,
        state.shapeRow,
        state.shapeCol + 1 * DESINTEGRATION
      );
      const updatedCol = willCollide
        ? state.shapeCol
        : state.shapeCol + 1 * DESINTEGRATION;
      const updatedBoard = addShapeToBoard(
        state.board,
        state.block,
        state.shape,
        state.shapeRow,
        updatedCol
      );

      return {
        renderedBoard: updatedBoard,
        shapeCol: updatedCol,
      };
    });
  },
  rotateBlock: () => {
    set((state) => {
      const rotatedShape = rotateBlockShape(state.shape);
      const willCollide = checkCollisions(
        state.board,
        rotatedShape,
        state.shapeRow,
        state.shapeCol
      );
      const updatedShape = willCollide ? state.shape : rotatedShape;
      const updatedBoard = addShapeToBoard(
        state.board,
        state.block,
        updatedShape,
        state.shapeRow,
        state.shapeCol
      );

      return {
        renderedBoard: updatedBoard,
        shape: updatedShape,
      };
    });
  },
  setIsSettling: (value: boolean) => {
    set(() => ({ isSettling: value }));
  },
  settleBlock: (): number[] => {
    const removedPowders = new Array<number>();

    set((state) => {
      const desBlocks = desintegrateBlocks(state.renderedBoard);

      const [newBoard, removed] = checkPowdris(desBlocks);
      removedPowders.push(...(removed as number[]));

      return {
        board: newBoard as BoardType,
        renderedBoard: newBoard as BoardType,
        isSettling: false,
        hasCollision: false,
      };
    });

    return removedPowders;
  },
  nextRound: (): boolean => {
    let hasLost = false;
    set((state) => {
      const updatedBoard = state.renderedBoard;
      const updatedBlock = state.nextBlocks.shift();
      const updatedShape = scaleBlockShape(updatedBlock.shape, DESINTEGRATION);
      const updatedNextBlocks = [...state.nextBlocks, getRandomBlock()];

      if (checkCollisions(updatedBoard, updatedShape, 0, 3 * DESINTEGRATION)) {
        hasLost = true;

        return {
          hasCollision: true,
          board: updatedBoard,
          renderedBoard: updatedBoard,
          shapeRow: -1,
          shapeCol: 3 * DESINTEGRATION,
          block: updatedBlock,
          shape: updatedShape,
          nextBlocks: updatedNextBlocks,
          nextBlockShapes: getPreviewBlocks(updatedNextBlocks),
        };
      }

      return {
        board: updatedBoard,
        renderedBoard: updatedBoard,
        shapeRow: -1,
        shapeCol: 3 * DESINTEGRATION,
        block: updatedBlock,
        shape: updatedShape,
        nextBlocks: updatedNextBlocks,
        nextBlockShapes: getPreviewBlocks(updatedNextBlocks),
      };
    });

    return hasLost;
  },
}));
