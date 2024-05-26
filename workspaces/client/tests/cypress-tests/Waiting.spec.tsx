import React from 'react';
import { Waiting } from '../../src/components/game/Waiting';

describe('<Waiting />: Waiting information', () => {
  it('Renders and calls function', () => {
    const backSpy = cy.spy().as('backSpy');
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Waiting stopHandler={backSpy} />);

    cy.contains('back to lobby').click();
    cy.get('@backSpy').should('have.been.called');
  });
});
