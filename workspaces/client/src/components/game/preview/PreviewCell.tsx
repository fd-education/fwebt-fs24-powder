import React from 'react';
import {
  PowdrominoTypes,
  VoidCell,
} from '../../../domain/enums/PowdrominoTypes';

interface PreviewCellProps {
  cellType: PowdrominoTypes | VoidCell;
}

export const PreviewCell = ({ cellType }: PreviewCellProps) => {
  return (
    <div className={`h-6 w-6`}>
      {cellType === VoidCell.VOID && (
        <div className={`h-full w-full invisible`}></div>
      )}
      {cellType === PowdrominoTypes.I && (
        <div className={`h-full w-full bg-powdromino-purple border`}></div>
      )}
      {cellType === PowdrominoTypes.J && (
        <div className={`h-full w-full bg-powdromino-green border`}></div>
      )}
      {cellType === PowdrominoTypes.L && (
        <div className={`h-full w-full bg-powdromino-red border`}></div>
      )}
      {cellType === PowdrominoTypes.Z && (
        <div className={`h-full w-full bg-powdromino-sky border`}></div>
      )}
      {cellType === PowdrominoTypes.S && (
        <div className={`h-full w-full bg-powdromino-blue border`}></div>
      )}
      {cellType === PowdrominoTypes.O && (
        <div className={`h-full w-full bg-powdromino-orange border`}></div>
      )}
      {cellType === PowdrominoTypes.T && (
        <div className={`h-full w-full bg-powdromino-yellow border`}></div>
      )}
    </div>
  );
};
