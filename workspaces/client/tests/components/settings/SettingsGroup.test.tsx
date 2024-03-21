import { ScreenModeToggle } from '@/src/components/settings/ScreenModeToggle';
import { SettingsGroup } from '@/src/components/settings/SettingsGroup';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SettingsGroup component: interface', () => {
  it('Should render screenmode toggle', () => {
    // Hier sollte besser ScreenModeToggle getestet werden (der Import ist noch da, also vermutlich auch einmal so gemacht)
    // weil SettingsGroup keine Funktion für den User bereitstellt
    render(<SettingsGroup />);
    expect(
        // auch mit Interaktion ergänzen -> klicken & dann? -> Ich will testen, was der User macht
      screen.getByTestId('dark-mode') || screen.getByTestId('light-mode')
    ).toBeTruthy();
  });
});
