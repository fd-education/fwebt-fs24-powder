import React from 'react';
import { VoidCell } from '../../../domain/blocks/BlockName';
import { BlockColor } from '../../../domain/blocks/BlockColor';

interface PreviewCellProps {
  type: BlockColor | VoidCell;
  display: boolean;
}

export const PreviewCell = ({ type, display }: PreviewCellProps) => {
  const borderStyle =
    'border dark:border-black-transparent border-white-transparent';

  return (
    <div
      data-testid='preview-cell'
      className={`h-6 w-6 ${!display && 'invisible'}`}
    >
      {type === VoidCell.VOID && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full invisible`}
        ></div>
      )}
      {type === BlockColor.PURPLE && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-purple ${borderStyle}`}
        ></div>
      )}
      {type === BlockColor.GREEN && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-green ${borderStyle}`}
        ></div>
      )}
      {type === BlockColor.RED && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-red ${borderStyle}`}
        ></div>
      )}
      {type === BlockColor.SKY && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-sky ${borderStyle}`}
        ></div>
      )}
      {type === BlockColor.BLUE && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-blue ${borderStyle}`}
        ></div>
      )}
      {type === BlockColor.ORANGE && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-orange ${borderStyle}`}
        ></div>
      )}
      {type === BlockColor.YELLOW && (
        <div
          data-testid='preview-cell-fill'
          className={`h-full w-full bg-powdromino-yellow ${borderStyle}`}
        ></div>
      )}
    </div>
  );
};
