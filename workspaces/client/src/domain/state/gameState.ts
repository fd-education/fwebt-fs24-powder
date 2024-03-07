import { create } from 'zustand';
import { BoardType, VoidCell } from '../enums/BlockName';
import { BlockName } from '../enums/BlockName';
import { BlockShape, blockShapes } from '../game/Powdromino.shapes';
import { PowderConfig } from '../config/PowderConfig';

interface GameStateVariables {
  board: BoardType;
  renderedBoard: BoardType;
  shapeRow: number;
  shapeCol: number;
  block: BlockName;
  shape: BlockShape;
  nextBlocks: BlockName[];
  nextBlockShapes: BoardType[];
  started: boolean;
  paused: boolean;
  ended: boolean;
  lost: boolean;
  hasCollision: boolean;
  isSettling: boolean;
}

interface GameState extends GameStateVariables {
  setIsSettling: (value: boolean) => void;
  startGame: () => void;
  continueGame: () => void;
  pauseGame: () => void;
  endGame: () => void;
  nextTick: () => void;
  moveBlockLeft: () => void;
  moveBlockRight: () => void;
  rotateBlock: () => void;
  settleBlock: () => void;
  nextRound: (removedLines: number, updatedBoard: BoardType) => void;
}

const getEmptyBoard = (height = PowderConfig.BOARD_ROWS): BoardType => {
  return Array(height)
    .fill(null)
    .map(() => Array(PowderConfig.BOARD_COLS).fill(VoidCell.VOID));
};

const getRandomBlock = (): BlockName => {
  const powdrominos = Object.values(BlockName);
  return powdrominos[
    Math.floor(Math.random() * powdrominos.length)
  ] as BlockName;
};

export const isColliding = (
  board: BoardType,
  shape: BlockShape,
  shapeRow: number,
  shapeCol: number
): boolean => {
  let collided = false;

  shape
    .filter((row: boolean[]) => row.some((hasBlock) => hasBlock))
    .forEach((row: boolean[], ri: number) => {
      row.forEach((hasBlock: boolean, ci: number) => {
        if (
          hasBlock &&
          // bottom collision
          (shapeRow + ri >= board.length ||
            // right collision
            shapeCol + ci >= board[0].length ||
            // left collision
            shapeCol + ci < 0 ||
            // block collision
            board[shapeRow + ri][shapeCol + ci] !== VoidCell.VOID)
        ) {
          collided = true;
        }
      });
    });

  return collided;
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

export const addShapeToBoard = (
  board: BoardType,
  block: BlockName,
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
          boardClone[shapeRow + ri][shapeCol + ci] = block;
        }
      });
    });

  return boardClone;
};

export const getPreviewBlocks = (next: BlockName[]): BoardType[] => {
  if (!next) return;

  const boards: BoardType[] = [];

  next.forEach((block) => {
    const shape = blockShapes[block].shape.filter((row: boolean[]) =>
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

const initialState: GameStateVariables = {
  board: [],
  renderedBoard: [],
  shapeRow: 0,
  shapeCol: 0,
  hasCollision: false,
  isSettling: false,
  block: BlockName.I,
  shape: blockShapes[BlockName.I].shape,
  nextBlocks: [],
  nextBlockShapes: [],
  started: false,
  paused: false,
  ended: false,
  lost: false,
};

export const useGameStateStore = create<GameState>()((set) => ({
  ...initialState,
  startGame: () => {
    const firstBlock = getRandomBlock();
    const nextBlocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()];

    set({
      board: getEmptyBoard(),
      renderedBoard: addShapeToBoard(
        getEmptyBoard(),
        firstBlock,
        blockShapes[firstBlock].shape,
        0,
        3
      ),
      shapeRow: -1,
      shapeCol: 3,
      block: firstBlock,
      shape: blockShapes[firstBlock].shape,
      nextBlocks,
      nextBlockShapes: getPreviewBlocks(nextBlocks),
      started: true,
      ended: false,
      lost: false,
      paused: false,
    });
  },
  pauseGame: () => {
    set((state) => {
      const invalidState = state.paused || !state.started || state.ended;
      return invalidState ? {} : { paused: true };
    });
  },
  continueGame: () => {
    set((state) => {
      const invalidState = !state.paused || !state.started || state.ended;
      return invalidState ? {} : { paused: false };
    });
  },
  endGame: () => {
    set((state) => {
      const invalidState = !state.started || state.paused || state.ended;
      return invalidState
        ? {}
        : {
            started: false,
            ended: true,
          };
    });
  },
  nextTick: () => {
    set((state) => {
      if (!state.started) return {};

      const updatedRow = state.shapeRow + 1;
      if (isColliding(state.board, state.shape, updatedRow, state.shapeCol)) {
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
      const willCollide = isColliding(
        state.board,
        state.shape,
        state.shapeRow,
        state.shapeCol - 1
      );
      const updatedCol = willCollide ? state.shapeCol : state.shapeCol - 1;
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
      const willCollide = isColliding(
        state.board,
        state.shape,
        state.shapeRow,
        state.shapeCol + 1
      );
      const updatedCol = willCollide ? state.shapeCol : state.shapeCol + 1;
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
      const willCollide = isColliding(
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
  settleBlock: () => {
    set((state) => {
      return {
        board: state.renderedBoard,
        isSettling: false,
        hasCollision: false,
      };
    });
  },
  nextRound: (removedLines: number, newBoard: BoardType) => {
    // TODO to comply with requirement FA-009, block must desintegrate upon settling
    set((state) => {
      const updatedBoard = [...getEmptyBoard(removedLines), ...newBoard];
      const updatedBlock = state.nextBlocks.shift();
      const updatedShape = blockShapes[updatedBlock].shape;
      const updatedNextBlocks = [...state.nextBlocks, getRandomBlock()];

      if (isColliding(updatedBoard, updatedShape, 0, 3)) {
        return {
          started: false,
          ended: true,
          lost: true,
          board: updatedBoard,
          renderedBoard: updatedBoard,
          shapeRow: -1,
          shapeCol: 3,
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
        shapeCol: 3,
        block: updatedBlock,
        shape: updatedShape,
        nextBlocks: updatedNextBlocks,
        nextBlockShapes: getPreviewBlocks(updatedNextBlocks),
      };
    });
  },
}));
