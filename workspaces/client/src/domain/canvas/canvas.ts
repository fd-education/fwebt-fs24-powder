import { powderConfig } from '../config/PowderConfig';
import { ScreenMode } from '../enums/ScreenMode';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';
import { BoardType, VoidCell } from '../blocks/BlockName';
type ObjectSize = {
  width: number,
  height: number, 
  x: number,
  y: number
}

export function getObjectSize(
  contains: boolean,
  containerWidth: number,
  containerHeight: number,
  width: number,
  height: number
): ObjectSize {
  const doRatio = width / height;
  const cRatio = containerWidth / containerHeight;
  let targetWidth = 0;
  let targetHeight = 0;
  const test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}


export const renderGrid = (ctx: CanvasRenderingContext2D, blockSize: number, screenMode: ScreenMode) => {
  const {BOARD_COLS, BOARD_ROWS} = powderConfig;

  for (let i = 1; i < BOARD_COLS; i++) {
    const colPos = blockSize * i;

    ctx.moveTo(colPos, 0);
    ctx.lineTo(colPos, ctx.canvas.height);
  }

  for (let i = 1; i < BOARD_ROWS; i++) {
    const rowPos = blockSize * i;

    ctx.moveTo(0, rowPos);
    ctx.lineTo(ctx.canvas.width, rowPos);
  }

  ctx.strokeStyle = screenMode === ScreenMode.DARK ? 'white' : 'black';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stroke();
}

export const renderBoard = (ctx: CanvasRenderingContext2D, renderedBoard: BoardType, blockSize: number) => {
  const tailwind = resolveConfig(tailwindConfig);

  renderedBoard.map((row, ri) => {
    row.map((cell, ci) => {
      if (cell !== VoidCell.VOID) {
        const color = tailwind.theme.colors[cell];

        ctx.fillStyle = color;
        ctx.fillRect(blockSize * ci, blockSize * ri, blockSize, blockSize);
      }
    });
  });
}