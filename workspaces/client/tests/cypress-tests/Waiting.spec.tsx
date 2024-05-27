import React from 'react';
import { Waiting } from '../../src/components/game/Waiting';
import { mount } from 'cypress/react18';

describe('<Waiting />: Waiting information', () => {
  it('Renders and calls function', () => {
    const backSpy = cy.spy().as('backSpy');
    // see: https://on.cypress.io/mounting-react
    mount(<Waiting stopHandler={backSpy} />);

    cy.contains('back to lobby').click();
    cy.get('@backSpy').should('have.been.called');
  });
});
