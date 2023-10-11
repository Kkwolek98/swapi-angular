/// <reference types="Cypress" />

import { GamePage } from "cypress/pages/game.page";

const game = new GamePage();

describe('Game page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have spinner while loading data', () => {
    game.assertSpinnerExists();
  });

  it('Should show buttons after data is loaded', () => {
    game.startButtonsDisplayed();
  });

  it('Should start the game', () => {
    game.playAs('people');
    game.gameHasStarted();
  });

  it('Should draw a card', () => {
    game.playAs('people')
    game.drawCard();
    game.haveCardsBeenDrawn();
  });

  it('Should use all 3 cards as starsbips and restart game as people', () => {
    game.playAs('starships')
    game.playAllCards();
    game.playAs('people')
    game.gameHasStarted();
  });
});