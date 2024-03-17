import { ScoreboardHeading } from '@/src/components/lobby/scoreboard/ScoreboardHeading';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('ScoreboardHeading component: interface', () => {
  it('Should accept and render heading text', () => {
    const testHeading = 'Test Heading';
    render(<ScoreboardHeading text={testHeading} />);
    expect(screen.getByText(testHeading)).toBeInTheDocument();
  });
});
