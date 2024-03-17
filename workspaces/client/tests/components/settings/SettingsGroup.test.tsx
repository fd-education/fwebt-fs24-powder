import { ScreenModeToggle } from '@/src/components/settings/ScreenModeToggle';
import { SettingsGroup } from '@/src/components/settings/SettingsGroup';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SettingsGroup component: interface', () => {
  it('Should render screenmode toggle', () => {
    render(<SettingsGroup />);
    expect(
      screen.getByTestId('dark-mode') || screen.getByTestId('light-mode')
    ).toBeTruthy();
  });
});
