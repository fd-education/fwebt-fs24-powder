import { BoardType } from '../../blocks/BlockName';
import { scaleBlockShape } from '../../blocks/BlockShapes';
import { powderConfig } from '../../config/PowderConfig';
import { Difficulty } from '../../enums/Difficulty';
import { checkCollisions, desintegrateBlocks } from '../../game/blockPhysics';
import { checkPowdris } from '../../game/powdris';
import { BoardState } from './boardStateStore';
import {
  getRandomBlock,
  getEmptyBoard,
  addShapeToBoard,
  getPreviewBlocks,
  rotateBlockShape,
} from './boardStateUtils';

const { DESINTEGRATION } = powderConfig;

export const getStartingState = (difficulty: Difficulty): Partial<BoardState> => {
  const firstBlock = getRandomBlock(difficulty);
  const nextBlocks = [getRandomBlock(difficulty), getRandomBlock(difficulty), getRandomBlock(difficulty)];

  return {
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
    difficulty
  };
};

export const getDropState = (state: BoardState): Partial<BoardState> => {
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
};

export const getMoveLeftState = (state: BoardState): Partial<BoardState> => {
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
};

export const getMoveRightState = (state: BoardState): Partial<BoardState> => {
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
};

export const getRotateState = (state: BoardState): Partial<BoardState> => {
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
};

export const getSettleState = (
  state: BoardState
): [Partial<BoardState>, number[]] => {
  const removedPowders = new Array<number>();

  const desBlocks = desintegrateBlocks(state.renderedBoard);

  const [newBoard, removed] = checkPowdris(desBlocks);
  removedPowders.push(...(removed as number[]));

  return [
    {
      board: newBoard as BoardType,
      renderedBoard: newBoard as BoardType,
      isSettling: false,
      hasCollision: false,
    },
    removedPowders,
  ];
};

export const getNextRoundState = (state: BoardState): Partial<BoardState> => {
  {
    const updatedBoard = state.renderedBoard;
    const updatedBlock = state.nextBlocks.shift();
    const updatedShape = scaleBlockShape(updatedBlock.shape, DESINTEGRATION);
    const updatedNextBlocks = [...state.nextBlocks, getRandomBlock(state.difficulty)];
    const hasCollision = checkCollisions(
      updatedBoard,
      updatedShape,
      0,
      3 * DESINTEGRATION
    );

    return {
      hasCollision,
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
};
