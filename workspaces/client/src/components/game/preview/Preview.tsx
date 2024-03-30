import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { PreviewCell } from './PreviewCell';
import {
  useGameStateStore,
  useOpponentGameStateStore,
} from '../../../domain/state/gameStateStore';
import {
  useBoardStateStore,
  useOpponentBoardStateStore,
} from '../../../domain/state/boardState/boardStateStore';
import { GameProgressStates } from '../../../domain/game/gameProgress';

interface PreviewProps {
  isOpponentPreview?: boolean;
}

export const Preview = ({ isOpponentPreview = false }: PreviewProps) => {
  const { nextBlockShapes } = isOpponentPreview
    ? useOpponentBoardStateStore()
    : useBoardStateStore();
  const { progress } = isOpponentPreview
    ? useOpponentGameStateStore()
    : useGameStateStore();

  return (
    <Panel height='min-h-[50%]' paddingX='px-4' paddingY='py-4'>
      <PanelHeading text='Up next' />
      <div className='h-full flex flex-col-reverse justify-around'>
        {nextBlockShapes &&
          nextBlockShapes.map((blocks, bi) => (
            <div key={bi}>
              {blocks.map((row, ri) => (
                <div key={ri} className='flex'>
                  {row.map((cell, ci) => (
                    <PreviewCell
                      key={`${ri}-${ci}`}
                      type={cell}
                      display={progress === GameProgressStates.started}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
    </Panel>
  );
};
