import { Title, TitleSize } from '@/src/components/util/Title';
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

describe('Title component: interface', () => {
  it('Should handle big title', () => {
    render(<Title size={TitleSize.BIG} />);

    expect(tSpy).toHaveBeenCalledWith('game_title.title');
    expect(tSpy).toHaveBeenCalledWith('game_title.subtitle');
  });

  it('Should handle small title', () => {
    render(<Title size={TitleSize.SMALL} />);

    expect(tSpy).toHaveBeenCalledWith('game_title.title');
    expect(tSpy).toHaveBeenCalledWith('game_title.subtitle');
  });
});
