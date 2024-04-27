import React from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { useScoreboardApi } from '../../../hooks/useScoreboardApi';
import { Loading } from '../../util/Loading';
import { Error } from '../../util/Error';
import { ScoreboardTable } from './ScoreboardTable';
import { useTranslation } from 'react-i18next';

export const Scoreboard = () => {
  const { data, loading, hasError, error } = useScoreboardApi();
  const {t} = useTranslation();

  return (
    <Panel>
      <PanelHeading text={t('lobby.scoreboard')} />
      {!hasError && loading && <Loading />}
      {hasError && <Error text={error} />}
      {!hasError && !loading && <ScoreboardTable scoreboard={data.ranking} />}
    </Panel>
  );
};
