import { Injectable } from "@angular/core";
import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { Person } from "../models/interfaces/person";
import { Starship } from "../models/interfaces/starship";

type AvailableCard = Person | Starship;

export interface GameStoreModel {
  playerPoints: number;
  cpuPoints: number;
  playerCard: AvailableCard | null;
  cpuCard: AvailableCard | null;
  playerDeck: AvailableCard[];
  cpuDeck: AvailableCard[];
  started: boolean;
}

export class GameStart {
  static readonly type = '[game] GameStart';
  constructor(public cards: AvailableCard[], public deckSize = 3) { } // chose cards type
}

export class GameDrawCard {
  static readonly type = '[game] GameDrawCard';
  constructor(public card: AvailableCard) { }
}

export class GameNextRound {
  static readonly type = '[game] GameNextRound';
}

@State<GameStoreModel>({
  name: 'game',
  defaults: {
    playerPoints: 0,
    cpuPoints: 0,
    playerCard: null,
    cpuCard: null,
    playerDeck: [],
    cpuDeck: [],
    started: false
  }
})
@Injectable()
export class GameStore {

  @Selector()
  static playerDeck(state: GameStoreModel): AvailableCard[] {
    return state.playerDeck;
  }

  @Selector()
  static cpuDeck(state: GameStoreModel): AvailableCard[] {
    return state.cpuDeck;
  }

  @Selector()
  static playerCard(state: GameStoreModel): AvailableCard | null {
    return state.playerCard;
  }

  @Selector()
  static cpuCard(state: GameStoreModel): AvailableCard | null {
    return state.cpuCard;
  }

  @Selector()
  static started(state: GameStoreModel): boolean {
    return state.started;
  }

  @Selector()
  static playerPoints(state: GameStoreModel): number {
    return state.playerPoints;
  }

  @Selector()
  static cpuPoints(state: GameStoreModel): number {
    return state.cpuPoints;
  }

  @Action(GameStart)
  startGame(ctx: StateContext<GameStoreModel>, action: GameStart) {
    if (action.cards?.length < action.deckSize * 2) {
      throw new Error('Deck size higher than cards length');
    }

    const cards = JSON.parse(JSON.stringify(action.cards));

    // Initialize decks and start the game
    const playerDeck: AvailableCard[] = this.pickRandomDeck(cards, action.deckSize);
    const cpuDeck: AvailableCard[] = this.pickRandomDeck(cards, action.deckSize);

    ctx.patchState({
      playerDeck,
      cpuDeck,
      playerPoints: 0,
      cpuPoints: 0,
      playerCard: null,
      cpuCard: null,
      started: true
    });
  }

  @Action(GameDrawCard)
  drawCard(ctx: StateContext<GameStoreModel>, action: GameDrawCard) {
    const state = ctx.getState();

    if (state.cpuCard || state.playerCard) {
      throw new Error('Cannot proceed to new round, cards are still on the table');
    }

    const playerDeck = state.playerDeck;
    const cpuDeck = state.cpuDeck;

    // Draw a card from the player's deck
    const playerCard = action.card;

    // Choose a random card from the CPU's deck
    const randomIndex = Math.floor(Math.random() * cpuDeck.length);
    const cpuCard = cpuDeck[randomIndex];

    let playerPoints = state.playerPoints;
    let cpuPoints = state.cpuPoints;

    let winner: 'player' | 'cpu' | 'tie' = 'tie';

    if (playerCard && cpuCard) {
      if (playerCard.power! > cpuCard.power!) {
        winner = 'player';
        playerPoints++;
      } else if (cpuCard.power! > playerCard.power!) {
        winner = 'cpu';
        cpuPoints++;
      }
    }

    ctx.patchState({
      playerCard,
      cpuCard,
      playerPoints,
      cpuPoints,
      playerDeck: playerDeck.filter(({name}) => name !== playerCard.name), // Remove player card from deck
      cpuDeck: cpuDeck.filter((_, index) => index !== randomIndex) // Remove the chosen CPU card from the deck
    });
  }

  @Action(GameNextRound)
  nextRound(ctx: StateContext<GameStoreModel>) {
    // Reset the player and CPU cards
    ctx.patchState({
      playerCard: null,
      cpuCard: null,
    });
  }

  pickRandomDeck(cards: AvailableCard[], deckSize: number): AvailableCard[] {
    if (deckSize > cards.length) {
      throw new Error('Deck size exceeds the number of available cards.');
    }

    // Fisher-Yates algorithm
    for (let i = cards.length - 1; i >= cards.length - deckSize; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    }

    const deck = cards.slice(-deckSize); // Extract the last `deckSize` elements as the deck
    cards.splice(-deckSize); // Remove the selected cards from the original array

    return deck;
  }
}
