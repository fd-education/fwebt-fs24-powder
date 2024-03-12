import React from 'react';
import { BlockName, VoidCell } from '../../../domain/blocks/BlockName';
import { powderConfig } from '../../../domain/config/PowderConfig';

interface CellProps {
  cellType: BlockName | VoidCell;
  display: boolean;
}

export const Cell = ({ cellType, display }: CellProps) => {
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
      {cellType === VoidCell.VOID && <div className={`h-full w-full`}></div>}
      {cellType === BlockName.I && (
        <div className={`h-full w-full bg-powdromino-purple`}></div>
      )}
      {cellType === BlockName.J && (
        <div className={`h-full w-full bg-powdromino-green`}></div>
      )}
      {cellType === BlockName.L && (
        <div className={`h-full w-full bg-powdromino-red`}></div>
      )}
      {cellType === BlockName.Z && (
        <div className={`h-full w-full bg-powdromino-sky`}></div>
      )}
      {cellType === BlockName.S && (
        <div className={`h-full w-full bg-powdromino-blue`}></div>
      )}
      {cellType === BlockName.O && (
        <div className={`h-full w-full bg-powdromino-orange`}></div>
      )}
      {cellType === BlockName.T && (
        <div className={`h-full w-full bg-powdromino-yellow`}></div>
      )}
    </div>
  );
};
