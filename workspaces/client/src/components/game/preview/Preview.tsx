import React, { useEffect, useRef } from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../../domain/state/gameStateStore';
import {
  useBoardStateStore,
  useOpponentBoardStateStore,
} from '../../../domain/state/boardState/boardStateStore';
import { GameProgressStates } from '../../../domain/game/gameProgress';
import { getObjectSize, renderPreview } from '../../../domain/canvas/canvas';
import { powderConfig } from '../../../domain/config/PowderConfig';

interface PreviewProps {
  isOpponentPreview?: boolean;
}

export const Preview = ({ isOpponentPreview = false }: PreviewProps) => {
  const { nextBlockShapes } = isOpponentPreview
    ? useOpponentBoardStateStore()
    : useBoardStateStore();
  const { progress } = isOpponentPreview
    ? useOpponentGameStateStore()
    : useGameStateStore();

  const canvasRef = useRef(null);
  const { BOARD_ROWS, BOARD_COLS } = powderConfig;

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

    canvas.hidden = progress !== GameProgressStates.started;

    renderPreview(ctx, nextBlockShapes);
  }, [canvasRef, nextBlockShapes, progress]);

  return (
    <Panel height='min-h-[50%]' paddingX='px-4' paddingY='py-4'>
      <PanelHeading text='Up next' />
      <canvas
        ref={canvasRef}
        className={`h-full block my-8 ${progress !== GameProgressStates.started ? 'invisible' : 'visible'}`}
      />
    </Panel>
  );
};
