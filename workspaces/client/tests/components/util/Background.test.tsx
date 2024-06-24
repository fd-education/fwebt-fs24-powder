import React from 'react';

import { Background } from '@/src/components/util/Background';
import { render, screen } from '@testing-library/react';

describe('Background component: interface', () => {
  it('Should accept and render children', () => {
    render(
      <Background>
        <div data-testid='test-child'></div>
      </Background>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
