import { LobbyChat } from '@/src/components/lobby/LobbyChat';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LobbyChat component: interface', () => {
  it('Should have heading', () => {
    render(<LobbyChat />);
    expect(screen.getByText('Lobby Chat')).toBeInTheDocument();
  });
});
