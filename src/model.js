import {HAND_TYPE} from './types.js';
import {getCardLogString} from './log.js';
import {HAND_TYPE_NAMES} from './constants.js';

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
    constructor(cards, playerName) {
        this.cards = cards;
        this.playerName = playerName;
    }

    getCards() {
        return this.cards;
    }

    toString() {
        return this.cards.map((card) => getCardLogString(card)).join(' ');
    }
}

export class HandResult {
    constructor(hand, handType, rank1, rank2 = undefined) {
        this.hand = hand;
        this.handType = handType;
        this.rank1 = rank1;
        this.rank2 = rank2;
    }

    compareTo(otherHandResult) {
        if (this.handType !== otherHandResult.handType) {
            return this.handType - otherHandResult.handType;
        }
        return this._compareToSameType(otherHandResult);
    }

    compareCardHands(otherHandResult) {
        const thisCards = this.hand.getCards();
        const otherCards = otherHandResult.hand.getCards();

        for (let i = 0; i < Math.min(thisCards.length, otherCards.length); i++) {
            const rankDiff = thisCards[i].getRank() - otherCards[i].getRank();
            if (rankDiff !== 0) {
                return rankDiff;
            }
        }
        return 0;
    }

    _compareToSameType(otherHandResult) {
        // Further comparison logic can be implemented in subclasses
        return 0;
    }

    toString() {
        const overview = `${HAND_TYPE_NAMES[this.handType]} - ${this.hand.toString()}`;
        const details = this._getDetailsString();
        return details ? `${overview} (${details})` : overview;
    }

    _getDetailsString() {
        return undefined;
    }
}

export class StraightFlushResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.STRAIGHT_FLUSH, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        return this.rank1 - otherHandResult.rank1;
    }
}

export class FourOfAKindResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.FOUR_OF_A_KIND, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare the four-of-a-kind rank first
        if (this.rank1 !== otherHandResult.rank1) {
            return this.rank1 - otherHandResult.rank1;
        }
        // If tied, compare kickers
        if (this.rank2 !== undefined && otherHandResult.rank2 !== undefined) {
            return this.rank2 - otherHandResult.rank2;
        }
        return 0;
    }
}

export class FullHouseResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.FULL_HOUSE, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare the three-of-a-kind rank first
        if (this.rank1 !== otherHandResult.rank1) {
            return this.rank1 - otherHandResult.rank1;
        }
        // If tied, compare the pair rank
        if (this.rank2 !== undefined && otherHandResult.rank2 !== undefined) {
            return this.rank2 - otherHandResult.rank2;
        }
        return 0;
    }
}

export class FlushResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.FLUSH, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // For flush, compare highest card
        // Assumes hands were made from the same board and thus have same suit
        return this.rank1 - otherHandResult.rank1;
    }
}

export class StraightResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.STRAIGHT, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare by high card of the straight
        return this.rank1 - otherHandResult.rank1;
    }
}

export class ThreeOfAKindResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.THREE_OF_A_KIND, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare the three-of-a-kind rank first
        if (this.rank1 !== otherHandResult.rank1) {
            return this.rank1 - otherHandResult.rank1;
        }
        // If tied, compare kickers in descending order
        return this.compareCardHands(otherHandResult);
    }
}

export class TwoPairResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.TWO_PAIR, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare the high pair first
        if (this.rank1 !== otherHandResult.rank1) {
            return this.rank1 - otherHandResult.rank1;
        }
        // If tied, compare the low pair
        if (this.rank2 !== otherHandResult.rank2) {
            return this.rank2 - otherHandResult.rank2;
        }

        // If still tied, compare kickers
        return this.compareCardHands(otherHandResult);
    }
}

export class OnePairResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.ONE_PAIR, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare the pair rank first
        if (this.rank1 !== otherHandResult.rank1) {
            return this.rank1 - otherHandResult.rank1;
        }
        // If tied, compare kickers in descending order
        return this.compareCardHands(otherHandResult);
    }
}

export class HighCardResult extends HandResult {
    constructor(hand, rank1, rank2 = undefined) {
        super(hand, HAND_TYPE.HIGH_CARD, rank1, rank2);
    }

    _compareToSameType(otherHandResult) {
        // Compare cards in descending order
        return this.compareCardHands(otherHandResult);
    }
}
