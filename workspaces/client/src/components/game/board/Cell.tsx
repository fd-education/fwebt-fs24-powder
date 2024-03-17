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
        return ['h-[2rem]', 'w-[2rem]'];
      case Desintegration.THREE:
        return ['h-[calc(2rem/3)]', 'w-[calc(2rem/3)]'];
      case Desintegration.FIVE:
        return ['h-[calc(2rem/5)]', 'w-[calc(2rem/5)]'];
      case Desintegration.TEN:
        return ['h-[calc(2rem/10)]', 'w-[calc(2rem/10)]'];
    }
  };

  const [height, width] = getDimension();

  return (
    <div className={`${height} ${width} ${!display && 'invisible'}`}>
      {type === VoidCell.VOID && <div className={`h-full w-full`}></div>}
      {type === BlockColor.PURPLE && (
        <div className={`h-full w-full bg-powdromino-purple`}></div>
      )}
      {type === BlockColor.GREEN && (
        <div className={`h-full w-full bg-powdromino-green`}></div>
      )}
      {type === BlockColor.RED && (
        <div className={`h-full w-full bg-powdromino-red`}></div>
      )}
      {type === BlockColor.SKY && (
        <div className={`h-full w-full bg-powdromino-sky`}></div>
      )}
      {type === BlockColor.BLUE && (
        <div className={`h-full w-full bg-powdromino-blue`}></div>
      )}
      {type === BlockColor.ORANGE && (
        <div className={`h-full w-full bg-powdromino-orange`}></div>
      )}
      {type === BlockColor.YELLOW && (
        <div className={`h-full w-full bg-powdromino-yellow`}></div>
      )}
    </div>
  );
};
