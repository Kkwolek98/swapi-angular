/// <reference types="Cypress" />

describe('Game page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have spinner while loading data', () => {
    cy.get('mat-spinner').should('exist');
  });

  it('Should show buttons after data is loaded', () => {
    cy.contains('Play as people', { timeout: 30000 }); // sometimes it takes up to 20-30 seconds to load data
    cy.contains('Play as starships', { timeout: 30000 }); // sometimes it takes up to 20-30 seconds to load data
  });

  it('Should start the game', () => {
    cy.contains('Play as people', { timeout: 30000 }).click();
    cy.contains('Player');
    cy.contains('CPU');
    cy.contains('Next round');
  });

  it('Should draw a card', () => {
    cy.contains('Play as people', { timeout: 30000 }).click();
    cy.contains('Draw').click();
    cy.get('[data-testid="drawnCpuCard"]');
    cy.get('[data-testid="drawnPlayerCard"]');
  });

  it('Should use all cards', () => {
    cy.contains('Play as people', { timeout: 30000 }).click();


    cy.contains('Draw').click();
  });
});