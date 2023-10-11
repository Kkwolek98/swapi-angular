/// <reference types="Cypress" />

export class GamePage {
  public playAs(entity: 'people' | 'starships' = 'people') {
    cy.location('pathname').should('equal', '/game');
    cy.contains(`Play as ${entity}`, { timeout: 30000 }).click();
    // sometimes it takes up to 20-30 seconds to load data
    // having problem with interceptor :((((((
  }

  public startButtonsDisplayed() {
    cy.contains('Play as people', { timeout: 30000 });
    cy.contains('Play as starships', { timeout: 30000 });
  }

  public drawCard() {
    cy.contains('Draw').click();
  }

  public nextRound() {
    cy.contains('Next round').click();
  }

  public haveCardsBeenDrawn() {
    cy.getByTestId('drawnPlayerCard');
    cy.getByTestId('drawnCpuCard');
  }

  public assertSpinnerExists() {
    cy.get('mat-spinner').should('exist');
  }

  public gameHasStarted() {
    cy.contains('Player');
    cy.contains('CPU');
    cy.contains('Next round');
  }

  public playAllCards() {
    for (let i = 0; i < 3; i++) { // maybe not the best approach but works in this scenario where it's instant
      this.drawCard();
      if (i !== 2) {
        this.nextRound();
      }
    }
  }

}