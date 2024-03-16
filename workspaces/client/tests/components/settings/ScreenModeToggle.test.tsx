import React from 'react';

import { ScreenMode } from '@/src/domain/enums/ScreenMode';
import { useScreenModeStore } from '@/src/domain/state/screenModeStore';
import { ScreenModeToggle } from '@/src/components/settings/ScreenModeToggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ScreenModeToggle component: interface & behaviour', () => {
  beforeEach(() => {
    useScreenModeStore.setState(
      {
        screenMode: ScreenMode.DARK,
        setScreenMode: () =>
          useScreenModeStore.setState({ screenMode: ScreenMode.LIGHT }),
      },
      true
    );
  });

  it('Should show icon based on current screenmode', () => {
    render(<ScreenModeToggle />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('Should switch the icon on click', async () => {
    render(<ScreenModeToggle />);

    await userEvent.click(await screen.findByTestId('light-mode'));
    expect(await screen.findByTestId('dark-mode')).toBeInTheDocument();
  });

  it('Should set the correct screenmode', async () => {
    render(<ScreenModeToggle />);

    await userEvent.click(screen.getByTestId('sun-icon'));
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });
});
