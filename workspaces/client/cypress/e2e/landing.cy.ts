describe('E2E: Landing', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:8080');
  })

  it('Should land on landing page, when no playername is present', () => {
    cy.url().should('include', '/landing');
  });
  
  it('Should switch screen modes on player interaction with the setting', () => {
    const button = cy.get('[data-testid="light-mode"]');
    button.should('be.visible');

    button.click();
    cy.get('[data-testid="dark-mode"]').should('be.visible');
  });

  it('Should switch language on player interaction with the setting', () => {
    const button = cy.contains('DE');
    button.should('be.visible');

    button.click();
    cy.contains('ENG').should('be.visible');
  });

  it('Should not accept empty inputs', () => {
    cy.get('input[type="submit"]').click();
    cy.url().should('include', '/landing');
  })

  it('Should take player name input and navigate to the lobby page', () => {
    cy.get('input[name="playerName"]').type('John Doe');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/lobby');
  })
});
