import { LobbyChat } from '@/src/components/lobby/LobbyChat';
import { render } from '@testing-library/react';
import React from 'react';

import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: 'en',
    },
  });
});

describe('LobbyChat component: interface', () => {
  it('Should have heading', () => {
    render(<LobbyChat />);
    expect(tSpy).toHaveBeenCalledWith('lobby.chat_title');
  });
});
