import { Dispatch, useReducer } from 'react';
import {
  BoardType,
  PowdrominoTypes,
  VoidCell,
} from '../domain/enums/PowdrominoTypes';
import { POWDROMINOS, PowdrominoShape } from '../domain/game/Powdromino.shapes';
import { PowderConfig } from '../domain/config/PowderConfig';

export type PowderState = {
  board: BoardType;
  shapeRow: number;
  shapeCol: number;
  block: PowdrominoTypes;
  shape: PowdrominoShape;
};

type Event = {
  updatedBoard?: BoardType;
  nextPowdromino?: PowdrominoTypes;
  isRotate?: boolean;
  isMoveLeft?: boolean;
  isMoveRight?: boolean;
  type: 'start' | 'drop' | 'move' | 'settle' | 'rotate';
};

export const useBoard = (): [PowderState, Dispatch<Event>] => {
  const [state, dispatchState] = useReducer(
    stateReducer,
    {
      board: [],
      shapeRow: 0,
      shapeCol: 0,
      block: PowdrominoTypes.O,
      shape: POWDROMINOS.O.shape,
    },
    (emptyState) => {
      const state = {
        ...emptyState,
        board: getEmptyBoard(),
      };
      return state;
    }
  );

  return [state, dispatchState];
};

const stateReducer = (state: PowderState, event: Event): PowderState => {
  const updatedState = { ...state };

  switch (event.type) {
    case 'start': {
      const firstBlock = getRandomPowdromino();
      return {
        board: getEmptyBoard(),
        shapeRow: 0,
        shapeCol: 3,
        block: firstBlock,
        shape: POWDROMINOS[firstBlock].shape,
      };
    }
    case 'drop':
      updatedState.shapeRow++;
      break;
    case 'settle':
      return {
        board: [
          ...getEmptyBoard(PowderConfig.BOARD_ROWS - event.updatedBoard!.length),
          ...event.updatedBoard
        ],
        shapeRow: 0,
        shapeCol: 3,
        block: event.nextPowdromino,
        shape: POWDROMINOS[event.nextPowdromino].shape,
      };
    case 'move': {
      const rotatedPowdromino = event.isRotate
        ? rotatePowdromino(updatedState.shape)
        : updatedState.shape;
      let cOffset = event.isMoveLeft? -1 : 0;
      cOffset = event.isMoveRight? 1 : cOffset;

      if (
        !isColliding(
          updatedState.board,
          rotatedPowdromino,
          updatedState.shapeRow,
          updatedState.shapeCol + cOffset
        )
      ) {
        updatedState.shapeCol += cOffset;
        updatedState.shape = rotatedPowdromino;
      } 
      
      break;
    }
    default:
      throw new Error(`Unknown event type: ${event.type}`);
  }

  return updatedState;
};

export const getEmptyBoard = (height = PowderConfig.BOARD_ROWS): BoardType => {
  return Array(height)
    .fill(null)
    .map(() => Array(PowderConfig.BOARD_COLS).fill(VoidCell.VOID));
};

export const getRandomPowdromino = (): PowdrominoTypes => {
  const powdrominos = Object.values(PowdrominoTypes);
  return powdrominos[
    Math.floor(Math.random() * powdrominos.length)
  ] as PowdrominoTypes;
};

export const isColliding = (
  board: BoardType,
  shape: PowdrominoShape,
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
          (shapeRow + ri >= board.length ||
            shapeCol + ci >= board[0].length ||
            shapeCol + ci < 0 ||
            board[shapeRow + ri][shapeCol + ci] !== VoidCell.VOID)
        ) {
          collided = true;
        }
      });
    });

  return collided;
};

export const rotatePowdromino = (shape: PowdrominoShape): PowdrominoShape => {
  const shapeRows = shape.length;
  const shapeCols = shape[0].length;

  const rotatedPowdromino = Array(shapeRows)
    .fill(null)
    .map(() => Array(shapeCols).fill(false));

  for(let r = 0; r < shapeRows; r++){
    for(let c = 0; c < shapeCols; c++){
      rotatedPowdromino[c][shapeRows - 1 - r] = shape[r][c];
    }
  }

  return rotatedPowdromino;
}