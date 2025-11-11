// Define ranks as numeric values (2-14, where Ace is 14)
export const RANKS = {
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
};

export const RANKS_DESCENDING = [
    RANKS.ACE,
    RANKS.KING,
    RANKS.QUEEN,
    RANKS.JACK,
    RANKS.TEN,
    RANKS.NINE,
    RANKS.EIGHT,
    RANKS.SEVEN,
    RANKS.SIX,
    RANKS.FIVE,
    RANKS.FOUR,
    RANKS.THREE,
    RANKS.TWO,
];

export const SUITS = {
    HEARTS: 1,
    DIAMONDS: 2,
    CLUBS: 3,
    SPADES: 4,
};

export const HAND_TYPE = {
    HIGH_CARD: 1,
    ONE_PAIR: 2,
    TWO_PAIR: 3,
    THREE_OF_A_KIND: 4,
    STRAIGHT: 5,
    FLUSH: 6,
    FULL_HOUSE: 7,
    FOUR_OF_A_KIND: 8,
    STRAIGHT_FLUSH: 9,
};

export class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    getRank() {
        return this.rank;
    }
    getSuit() {
        return this.suit;
    }
}

// Concept of a hand
export class Hand {
    constructor(playerName, cards) {
        this.playerName = playerName;
        this.cards = cards;
    }

    getCards() {
        return this.cards;
    }
}

export class HandResult {
    constructor(hand, handType, rank1, rank2 = undefined) {
        this.hand = hand;
        this.handType = handType;
        this.rank1 = rank1;
        this.rank2 = rank2;
    }
}
