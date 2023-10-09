/// <reference types="Cypress" />

describe('Testing basics', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.contains('SW Api Test');
  });

  it('Should redirect to /game', () => {
    cy.url().should('include', 'game');
  });
})
