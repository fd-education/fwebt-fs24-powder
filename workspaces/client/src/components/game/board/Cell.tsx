import React from 'react';
import { VoidCell } from '../../../domain/blocks/BlockName';
import {
  Desintegration,
  powderConfig,
} from '../../../domain/config/PowderConfig';
import { BlockColor } from '../../../domain/blocks/BlockColor';

interface CellProps {
  type: BlockColor | VoidCell;
  display: boolean;
}

export const Cell = ({ type, display }: CellProps) => {
  const getDimension = (): [string, string] => {
    const { DESINTEGRATION } = powderConfig;

    switch (DESINTEGRATION) {
      case Desintegration.ONE:
        return ['h-[calc(2rem/1)]', 'w-[calc(2rem/1)]'];
      case Desintegration.THREE:
        return ['h-[calc(2rem/3)]', 'w-[calc(2rem/3)]'];
      case Desintegration.FIVE:
        return ['h-[calc(2rem/5)]', 'w-[calc(2rem/5)]'];
      case Desintegration.TEN:
        return ['h-[calc(2rem/10)]', 'w-[calc(2rem/10)]'];
      default:
        throw new Error(
          `Unhandled desintegration factor: ${DESINTEGRATION} > ${Desintegration.ONE}`
        );
    }
  };

  const [height, width] = getDimension();

  return (
    <div
      data-testid='board-cell'
      className={`${height} ${width} ${!display && 'invisible'}`}
    >
      {type === VoidCell.VOID && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full invisible`}
        ></div>
      )}
      {type === BlockColor.PURPLE && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-purple`}
        ></div>
      )}
      {type === BlockColor.GREEN && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-green`}
        ></div>
      )}
      {type === BlockColor.RED && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-red`}
        ></div>
      )}
      {type === BlockColor.SKY && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-sky`}
        ></div>
      )}
      {type === BlockColor.BLUE && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-blue`}
        ></div>
      )}
      {type === BlockColor.ORANGE && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-orange`}
        ></div>
      )}
      {type === BlockColor.YELLOW && (
        <div
          data-testid='board-cell-fill'
          className={`h-full w-full bg-powdromino-yellow`}
        ></div>
      )}
    </div>
  );
};
