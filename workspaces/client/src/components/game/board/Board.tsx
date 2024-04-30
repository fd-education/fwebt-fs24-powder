import React, { useEffect, useRef } from 'react';
import { Panel } from '../../util/Panel';
import { useGameStateStore } from '../../../domain/state/gameStateStore';
import { useBoardStateStore } from '../../../domain/state/boardState/boardStateStore';
import { powderConfig } from '../../../domain/config/PowderConfig';
import {
  getObjectSize,
  renderBoard,
  renderGrid,
} from '../../../domain/canvas/canvas';
import { useScreenModeStore } from '../../../domain/state/screenModeStore';
import { GameProgressStates } from '@powder/common';

interface BoardProps {
  isOpponentBoard?: boolean;
}

export const Board = ({ isOpponentBoard = false }: BoardProps) => {
  const { progress } = useGameStateStore(isOpponentBoard);
  const { renderedBoard } = useBoardStateStore(isOpponentBoard);

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

    renderGrid(ctx, blockSize, screenMode);
    renderBoard(ctx, renderedBoard, blockSizeDes);
  }, [canvasRef, renderedBoard, progress]);

  return (
    <Panel height='h-full'>
      <canvas
        ref={canvasRef}
        data-testid={'board-canvas'}
        className={`h-full block ${progress !== GameProgressStates.started ? 'invisible' : 'visible'}`}
      />
    </Panel>
  );
};
