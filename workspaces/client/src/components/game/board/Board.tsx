import React, { useEffect, useRef } from 'react';
import { Panel } from '../../util/Panel';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../../domain/state/gameStateStore';
import {
  useBoardStateStore,
  useOpponentBoardStateStore,
} from '../../../domain/state/boardState/boardStateStore';
import { GameProgressStates } from '../../../domain/game/gameProgress';
import { powderConfig } from '../../../domain/config/PowderConfig';
import { getObjectSize, renderBoard, renderGrid } from '../../../domain/canvas/canvas';
import { useScreenModeStore } from '../../../domain/state/screenModeStore';

interface BoardProps {
  isOpponentBoard?: boolean;
}

export const Board = ({ isOpponentBoard = false }: BoardProps) => {
  const { progress } = isOpponentBoard
    ? useOpponentGameStateStore()
    : useGameStateStore();
  const { renderedBoard } = isOpponentBoard
    ? useOpponentBoardStateStore()
    : useBoardStateStore();

  const { BOARD_ROWS, BOARD_COLS, DESINTEGRATION } = powderConfig;
  const { screenMode } = useScreenModeStore();

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;

    const dimensions = getObjectSize(
      canvas.clientWidth,
      canvas.clientHeight,
      canvas.width,
      canvas.height
    );

    canvas.height = dimensions.height;
    canvas.width = (canvas.height / BOARD_ROWS) * BOARD_COLS;

    const ctx = canvas.getContext('2d');

    const blockSize = canvas.height / BOARD_ROWS;
    const blockSizeDes = blockSize / DESINTEGRATION;

    canvas.hidden = progress !== GameProgressStates.started;

    renderGrid(ctx, blockSize, screenMode);
    renderBoard(ctx, renderedBoard, blockSizeDes);
  }, [canvasRef, renderedBoard, progress]);

  return (
    <Panel height='h-full'>
      <canvas ref={canvasRef} height='' width='' className='h-full block'/>
    </Panel>
  );
};
