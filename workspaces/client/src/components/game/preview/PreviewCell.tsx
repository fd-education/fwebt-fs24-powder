import React from 'react';
import { BlockName, VoidCell } from '../../../domain/enums/BlockName';

interface PreviewCellProps {
  cellType: BlockName | VoidCell;
  display: boolean;
}

export const PreviewCell = ({ cellType, display }: PreviewCellProps) => {
  return (
    <div className={`h-6 w-6 ${!display && 'invisible'}`}>
      {cellType === VoidCell.VOID && (
        <div className={`h-full w-full invisible`}></div>
      )}
      {cellType === BlockName.I && (
        <div className={`h-full w-full bg-powdromino-purple border`}></div>
      )}
      {cellType === BlockName.J && (
        <div className={`h-full w-full bg-powdromino-green border`}></div>
      )}
      {cellType === BlockName.L && (
        <div className={`h-full w-full bg-powdromino-red border`}></div>
      )}
      {cellType === BlockName.Z && (
        <div className={`h-full w-full bg-powdromino-sky border`}></div>
      )}
      {cellType === BlockName.S && (
        <div className={`h-full w-full bg-powdromino-blue border`}></div>
      )}
      {cellType === BlockName.O && (
        <div className={`h-full w-full bg-powdromino-orange border`}></div>
      )}
      {cellType === BlockName.T && (
        <div className={`h-full w-full bg-powdromino-yellow border`}></div>
      )}
    </div>
  );
};
