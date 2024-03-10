import { create } from 'zustand';
import { BlockName, BoardType, VoidCell } from '../enums/BlockName';
import { BlockShape, blockShapes } from '../game/Powdromino.shapes';
import { PowderConfig } from '../config/PowderConfig';
import { useGamePhysics } from '../../hooks/useGamePhysics';

interface BoardState {
  board: BoardType;
  renderedBoard: BoardType;
  shapeRow: number;
  shapeCol: number;
  block: BlockName;
  shape: BlockShape;
  hasCollision: boolean;
  isSettling: boolean;
  nextBlocks: BlockName[];
  nextBlockShapes: BoardType[];
  dropBlock: () => void;
  moveBlockLeft: () => void;
  moveBlockRight: () => void;
  rotateBlock: () => void;
  setIsSettling: (isSettling: boolean) => void;
  settleBlock: () => void;
  nextRound: (removedLines: number, newBoard: BoardType) => boolean;
}

const { checkCollisions } = useGamePhysics();

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

const addShapeToBoard = (
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

const getPreviewBlocks = (next: BlockName[]): BoardType[] => {
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

export const useBoardStateStore = create<BoardState>((set) => {
  const firstBlock = getRandomBlock();
  const nextBlocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()];

  return {
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
    hasCollision: false,
    isSettling: false,
    dropBlock: () => {
      set(state => {
        const updatedRow = state.shapeRow + 1;
        if (checkCollisions(state.board, state.shape, updatedRow, state.shapeCol)) {
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
      })
    },
    moveBlockLeft: () => {
      set((state) => {
        const willCollide = checkCollisions(
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
        const willCollide = checkCollisions(
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
    settleBlock: () => {
      set((state) => {
        return {
          board: state.renderedBoard,
          isSettling: false,
          hasCollision: false,
        };
      });
    },
    nextRound: (removedLines: number, newBoard: BoardType): boolean => {
      let hasLost = false;
      // TODO to comply with requirement FA-009, block must desintegrate upon settling
      set((state) => {
        const updatedBoard = [...getEmptyBoard(removedLines), ...newBoard];
        const updatedBlock = state.nextBlocks.shift();
        const updatedShape = blockShapes[updatedBlock].shape;
        const updatedNextBlocks = [...state.nextBlocks, getRandomBlock()];

        if (checkCollisions(updatedBoard, updatedShape, 0, 3)) {
          hasLost = true;

          return {
            hasCollision: true,
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

      return hasLost;
    },
  }
});