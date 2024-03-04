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
    <div className={`h-6 w-6 border-2`}>
      {cellType === VoidCell.VOID && (
        <div className={`h-full w-full bg-primary-light`}></div>
      )}
      {cellType === PowdrominoTypes.I && (
        <div className={`h-full w-full bg-powdromino-purple`}></div>
      )}
      {cellType === PowdrominoTypes.J && (
        <div className={`h-full w-full bg-powdromino-green`}></div>
      )}
      {cellType === PowdrominoTypes.L && (
        <div className={`h-full w-full bg-powdromino-red`}></div>
      )}
      {cellType === PowdrominoTypes.Z && (
        <div className={`h-full w-full bg-powdromino-sky`}></div>
      )}
      {cellType === PowdrominoTypes.S && (
        <div className={`h-full w-full bg-powdromino-blue`}></div>
      )}
      {cellType === PowdrominoTypes.O && (
        <div className={`h-full w-full bg-powdromino-orange`}></div>
      )}
      {cellType === PowdrominoTypes.T && (
        <div className={`h-full w-full bg-powdromino-yellow`}></div>
      )}
    </div>
  );
};
