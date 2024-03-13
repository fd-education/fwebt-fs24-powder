import React from 'react';
import { VoidCell } from '../../../domain/blocks/BlockName';
import { powderConfig } from '../../../domain/config/PowderConfig';
import { BlockColor } from '../../../domain/blocks/BlockColor';

interface CellProps {
  type: BlockColor | VoidCell;
  display: boolean;
}

export const Cell = ({ type, display }: CellProps) => {
  const { DESINTEGRATION } = powderConfig;

  const getHeight = () => {
    switch (DESINTEGRATION) {
      case 1:
        return 'h-[2rem]';
      case 3:
        return 'h-[calc(2rem/3)]';
      case 5:
        return 'h-[calc(2rem/5)]';
      case 10:
        return 'h-[calc(2rem/10)]';
    }
  };

  const getWidth = () => {
    switch (DESINTEGRATION) {
      case 1:
        return 'w-[2rem]';
      case 3:
        return 'w-[calc(2rem/3)]';
      case 5:
        return 'w-[calc(2rem/5)]';
      case 10:
        return 'w-[calc(2rem/10)]';
    }
  };

  return (
    <div className={`${getHeight()} ${getWidth()} ${!display && 'invisible'}`}>
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
