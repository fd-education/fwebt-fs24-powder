describe('E2E: Lobby (integration)', () => {
  beforeEach(() => {
    window.localStorage.setItem('player', '{"state":{"playerName":"John Doe","sessionId":"test"},"version":0}');
  });

  it('Should land on lobby page, when playername is present', () => {
    cy.visit('http://localhost:8080');

    cy.url().should('include', '/lobby');
  });

  it('Should display scoreboard error, when no response is present', () => {
    cy.intercept('GET', 'http://localhost:3000/scoreboard', {forceNetworkError: true}).as('getScoreboard');
    cy.visit('http://localhost:8080');
    
    cy.wait('@getScoreboard').should('have.property', 'error');
    cy.contains('Failed to fetch');
  });

  it('Should display scoreboard, when response is present', () => {
    cy.intercept('GET', 'http://localhost:3000/scoreboard', {fixture: 'scoreboard.json'}).as('getScoreboard');
    cy.visit('http://localhost:8080');
    
    cy.wait('@getScoreboard');
    cy.contains('John Doe');
    cy.contains('Jane Doe');
    cy.contains('Max Mustermann');
  });
});
