import React, { useEffect, useRef } from 'react';
import { Panel } from '../../util/Panel';
import { Cell } from './Cell';
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

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const boardHeight = ctx.canvas.getBoundingClientRect().height;
    const cellHeight = boardHeight / (BOARD_ROWS * DESINTEGRATION);
    const boardWidth = cellHeight * BOARD_COLS;

    ctx.canvas.width = boardWidth;
    ctx.canvas.height = cellHeight * BOARD_ROWS;

    
    for (let i = 1; i <= BOARD_COLS; i++) {
      const colPos = cellHeight * i;
      
      ctx.moveTo(colPos, 0);
      ctx.lineTo(colPos, boardHeight);
    }
    
    for (let i = 1; i <= BOARD_ROWS; i++) {
      const rowPos = cellHeight * i;
      
      ctx.moveTo(0, rowPos);
      ctx.lineTo(boardWidth, rowPos);
    }
    
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
  }, [canvasRef]);

  return (
    <Panel height='h-full' width='w-fit'>
      {false && (
        <div className='border-2 border-white-transparent dark:border-black-transparent'>
          {renderedBoard.map((row, ri) => (
            <div key={ri} className='flex'>
              {row.map((cell, ci) => (
                <Cell
                  key={`${ri}-${ci}`}
                  type={cell}
                  display={progress === GameProgressStates.started}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      {true && <canvas ref={canvasRef} className='h-full' />}
    </Panel>
  );
};
