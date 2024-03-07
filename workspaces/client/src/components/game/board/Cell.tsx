import React from 'react';
import { BlockName, VoidCell } from '../../../domain/enums/BlockName';

interface CellProps {
  cellType: BlockName | VoidCell;
  display: boolean;
}

export const Cell = ({ cellType, display }: CellProps) => {
  return (
    <div className={`h-8 w-8 border-2 dark:border-black-transparent border-white-transparent border-collapse ${!display && 'invisible'}`}>
      {cellType === VoidCell.VOID && (
        <div className={`h-full w-full`}></div>
      )}
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
