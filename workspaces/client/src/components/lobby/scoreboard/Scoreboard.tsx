import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { useScoreboardApi } from '../../../hooks/useScoreboardApi';
import { Loading } from '../../util/Loading';
import { Error } from '../../util/Error';
import { ScoreboardTable } from './ScoreboardTable';

export const Scoreboard = () => {
  const { data, loading, hasError, error } = useScoreboardApi();

  return (
    <Panel>
      <PanelHeading text='Scoreboard' />
      {!hasError && loading && <Loading />}
      {hasError && <Error text={error} />}
      {!hasError && !loading && <ScoreboardTable scoreboard={data.ranking} />}
    </Panel>
  );
};
