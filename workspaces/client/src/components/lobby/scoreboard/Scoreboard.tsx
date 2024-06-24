import React, { useEffect } from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { Loading } from '../../util/Loading';
import { Error } from '../../util/Error';
import { ScoreboardTable } from './ScoreboardTable';
import { useTranslation } from 'react-i18next';
import { useScoreboardStore } from '../../../domain/state/scoreboardState';

export const Scoreboard = () => {
  const {error, success, errorData, loading, fetchScoreboard} = useScoreboardStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchScoreboard();
  }, [success])

  return (
    <Panel>
      <PanelHeading text={t('lobby.scoreboard')} />
      {!error && loading && <Loading />}
      {error && <Error text={errorData} />}
      {success && <ScoreboardTable />}
    </Panel>
  );
};
