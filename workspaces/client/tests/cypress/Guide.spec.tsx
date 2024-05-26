import React from 'react';
import { Guide } from '../../src/components/game/Guide';

describe('<Guide />', () => {
  it('Calls listener', () => {
    const readySpy = cy.spy().as('readySpy');
    cy.mount(<Guide readyHandler={readySpy} />);

    cy.contains("i'm ready").click();
    cy.get('@readySpy').should('have.been.called');
  });

  it('Renders player controls', () => {
    cy.mount(<Guide readyHandler={cy.spy()} />);

    cy.get('[data-cy=rotate]').should('have.text', '▲');
    cy.get('[data-cy=left]').should('have.text', '◀︎');
    cy.get('[data-cy=drop]').should('have.text', '▼');
    cy.get('[data-cy=right]').should('have.text', '▶︎');
  });

  it('Renders opponent controls', () => {
    cy.mount(<Guide readyHandler={cy.spy()} isLocalMultiplayer={true} />);

    cy.get('[data-cy=rotate]').should('have.text', 'w▲');
    cy.get('[data-cy=left]').should('have.text', 'a◀︎');
    cy.get('[data-cy=drop]').should('have.text', 's▼');
    cy.get('[data-cy=right]').should('have.text', 'd▶︎');
  });
});
