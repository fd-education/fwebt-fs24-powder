import React, { useEffect, useState } from 'react';
import { Panel } from '../../util/Panel';
import { PanelHeading } from '../../util/PanelHeading';
import { powderConfig } from '../../../domain/config/PowderConfig';
import { usePlayerNameStore } from '../../../domain/state/playerNameStore';
import { ScoreboardResponse } from '@powder/common';
import { ScoreboardCell } from './ScoreboardCell';
import { ScoreboardHeading } from './ScoreboardHeading';

export const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<ScoreboardResponse>();
  const { playerName } = usePlayerNameStore();
  const { SERVER_URL, SCOREBOARD_ENDPOINT } = powderConfig;

  useEffect(() => {
    const url = `${SERVER_URL}/${SCOREBOARD_ENDPOINT}?name=${playerName}`;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setScoreboard(data));
  }, []);

  return (
    <Panel>
      <PanelHeading text='Scoreboard' />
      <table className='px-8 py-4'>
        <thead>
          <tr>
            <ScoreboardHeading text='Rank' />
            <ScoreboardHeading text='Player' />
            <ScoreboardHeading text='Score' />
          </tr>
        </thead>
        <tbody>
          {scoreboard &&
            scoreboard.ranking.map((score, rank) => (
              <tr key={rank}>
                <ScoreboardCell text={`${rank + 1}`} />
                <ScoreboardCell text={score.name} />
                <ScoreboardCell text={`${score.score}`} />
              </tr>
            ))}
        </tbody>
      </table>
    </Panel>
  );
};
