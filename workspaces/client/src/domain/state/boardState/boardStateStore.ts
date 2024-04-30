import { create } from 'zustand';
import { BlockName, BoardType } from '../../blocks/BlockName';
import {
  BlockInfo,
  BlockShape,
  blocks,
  scaleBlockShape,
} from '../../blocks/BlockShapes';
import { powderConfig } from '../../config/PowderConfig';
import { getEmptyBoard, getRandomBlock } from './boardStateUtils';
import {
  getDropState,
  getMoveLeftState,
  getMoveRightState,
  getNextRoundState,
  getRotateState,
  getSettleState,
  getStartingState,
} from './boardStateGetters';
import { Difficulty } from '@powder/common';

export interface BoardStateVars {
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
  difficulty: Difficulty;
}

export interface BoardState extends BoardStateVars {
  initializeBoard: (difficulty: number) => void;
  dropBlock: () => void;
  moveBlockLeft: () => void;
  moveBlockRight: () => void;
  rotateBlock: () => void;
  setIsSettling: (isSettling: boolean) => void;
  settleBlock: () => number[];
  nextRound: (removedLines: number, newBoard: BoardType) => boolean;
  getState: () => BoardState;
  applyState: (state: Partial<BoardStateVars>) => void;
}

const { DESINTEGRATION } = powderConfig;

const initialState: BoardStateVars = {
  board: getEmptyBoard(),
  renderedBoard: getEmptyBoard(),
  shapeRow: -1 * DESINTEGRATION,
  shapeCol: 3 * DESINTEGRATION,
  block: getRandomBlock(Difficulty.NORMAL),
  shape: scaleBlockShape(blocks[BlockName.I].shape, DESINTEGRATION),
  nextBlocks: [],
  nextBlockShapes: [],
  hasCollision: false,
  isSettling: false,
  difficulty: Difficulty.NORMAL
};

const boardStoreDefinition = (
  set: (
    partial:
      | BoardState
      | Partial<BoardState>
      | ((state: BoardState) => BoardState | Partial<BoardState>),
    replace?: boolean | undefined
  ) => void,
  get: () => BoardState
) =>
  ({
    ...initialState,
    initializeBoard: (difficulty: number) => {
      set(() => getStartingState(difficulty));
    },
    dropBlock: () => {
      set((state) => {
        const update = getDropState(state);
        return update;
      });
    },
    moveBlockLeft: () => {
      set((state) => {
        if (state.shapeRow < 0) return {};

        return getMoveLeftState(state);
      });
    },
    moveBlockRight: () => {
      set((state) => {
        if (state.shapeRow < 0) return {};

        return getMoveRightState(state);
      });
    },
    rotateBlock: () => {
      set((state) => {
        if (state.shapeRow < 0) return {};

        return getRotateState(state);
      });
    },
    setIsSettling: (value: boolean) => {
      set(() => ({ isSettling: value }));
    },
    settleBlock: (): number[] => {
      const removedPowders = new Array<number>();

      set((state) => {
        const [updatedState, removed] = getSettleState(state);
        removedPowders.push(...removed);

        return updatedState;
      });

      return removedPowders;
    },
    nextRound: (): boolean => {
      let hasLost = false;

      set((state) => {
        const updatedState = getNextRoundState(state);

        hasLost = updatedState.hasCollision;

        return updatedState;
      });

      return hasLost;
    },
    getState: () => get(),
    applyState: (state: Partial<BoardStateVars>) => {
      set(() => {
        return state;
      });
    },
  }) as BoardState;

export const useBoardStateStore = create<BoardState>(boardStoreDefinition);
export const useOpponentBoardStateStore =
  create<BoardState>(boardStoreDefinition);
