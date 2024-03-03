import { Dispatch, useReducer } from 'react';
import { PowdrominoTypes, VoidCell } from '../domain/enums/PowdrominoTypes';
import { POWDROMINOS, PowdrominoShape } from '../domain/game/Powdromino.shapes';
import { PowderConfig } from '../domain/config/PowderConfig';

export type PowderState = {
  board: PowdrominoTypes[][];
  position: {
    row: number;
    col: number;
  };
  block: PowdrominoTypes;
  shape: PowdrominoShape;
};

type Event = {
  type: 'start' | 'drop' | 'move';
};

const stateReducer = (state: PowderState, event: Event): PowderState => {
  const firstBlock = getRandomBlock();
  const updatedState = {...state};

  switch (event.type) {
    case 'start':
      return {
        board: getEmptyBoard(),
        position: {
          row: 0,
          col: 3
        },
        block: firstBlock,
        shape: POWDROMINOS[firstBlock].shape
      }
    case 'drop':
      updatedState.position.row++;
      break;
    case 'move':
      break;
    default:
      throw new Error(`Unknown event type: ${event.type}`);
  }

  return updatedState;
};

export const useBoard = (): [PowderState, Dispatch<Event>] => {
  const [state, dispatchState] = useReducer(
    stateReducer,
    {
      board: [],
      position: {
        row: 0,
        col: 0,
      },
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

export const getEmptyBoard = (height = PowderConfig.BOARD_ROWS): PowdrominoTypes[][] => {
  return Array(height)
    .fill(null)
    .map(() => Array(PowderConfig.BOARD_COLS).fill(VoidCell.VOID));
};

export const getRandomBlock = (): PowdrominoTypes => {
  const powdrominos = Object.values(PowdrominoTypes);
  return powdrominos[Math.floor(Math.random() * powdrominos.length)] as PowdrominoTypes;
}
