import React from 'react';
import { BlockName, VoidCell } from '../../../domain/enums/BlockName';

interface PreviewCellProps {
  cellType: BlockName | VoidCell;
  display: boolean;
}

export const PreviewCell = ({ cellType, display }: PreviewCellProps) => {
  const borderStyle = 'border dark:border-black-transparent border-white-transparent';

  return (
    <div className={`h-6 w-6 ${!display && 'invisible'}`}>
      {cellType === VoidCell.VOID && (
        <div className={`h-full w-full invisible`}></div>
      )}
      {cellType === BlockName.I && (
        <div
          className={`h-full w-full bg-powdromino-purple ${borderStyle}`}
        ></div>
      )}
      {cellType === BlockName.J && (
        <div
          className={`h-full w-full bg-powdromino-green ${borderStyle}`}
        ></div>
      )}
      {cellType === BlockName.L && (
        <div className={`h-full w-full bg-powdromino-red ${borderStyle}`}></div>
      )}
      {cellType === BlockName.Z && (
        <div className={`h-full w-full bg-powdromino-sky ${borderStyle}`}></div>
      )}
      {cellType === BlockName.S && (
        <div
          className={`h-full w-full bg-powdromino-blue ${borderStyle}`}
        ></div>
      )}
      {cellType === BlockName.O && (
        <div
          className={`h-full w-full bg-powdromino-orange ${borderStyle}`}
        ></div>
      )}
      {cellType === BlockName.T && (
        <div
          className={`h-full w-full bg-powdromino-yellow ${borderStyle}`}
        ></div>
      )}
    </div>
  );
};
