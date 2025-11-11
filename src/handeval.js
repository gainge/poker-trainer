import {RANKS, SUITS, HAND_TYPE, HandResult, RANKS_DESCENDING, Card, Hand} from './model.js';

/**
 * Suite of utility functions to evaluate poker hands
 *
 * @file handeval.js
 *
 * @param handDataMap a map of Rank -> Array of Cards
 * @returns {HandResult | undefined} the best straight flush hand found, or undefined if none exists
 */

function cardsAreConsecutive(card1, card2) {
    return (
        Math.abs(RANKS_DESCENDING.indexOf(card1) - RANKS_DESCENDING.indexOf(card2)) === 1 ||
        Math.abs(RANKS_DESCENDING.indexOf(card1) - RANKS_DESCENDING.indexOf(card2)) === RANKS_DESCENDING.length - 1
    );
}

export function getStraightFlushHand(handDataMap) {
    // Iterate over handDataMap to find consecutive ranks of the same suit
    const potentialStraightFlushes = {};
    const suits = [SUITS.HEARTS, SUITS.DIAMONDS, SUITS.CLUBS, SUITS.SPADES];
    for (const suit of suits) {
        potentialStraightFlushes[suit] = [];
    }

    for (const rank of [...RANKS_DESCENDING, RANKS.ACE]) {
        const cardsAtRank = handDataMap[rank] ?? [];
        for (const card of cardsAtRank) {
            potentialStraightFlushes[card.suit].push(card.rank);
        }
    }

    // Check each suit for a straight flush
    for (const suit of suits) {
        const cards = potentialStraightFlushes[suit];
        if (cards.length < 5) {
            continue;
        }

        let consecutiveCount = 0;
        let highestRankInStraightFlush = undefined;

        for (let i = 0; i < cards.length; i++) {
            if (i > 0 && cardsAreConsecutive(cards[i - 1], cards[i])) {
                consecutiveCount++;
            } else {
                consecutiveCount = 1;
            }
            if (consecutiveCount >= 5) {
                highestRankInStraightFlush = cards[i - 4];
                break;
            }
        }

        if (highestRankInStraightFlush !== undefined) {
            return new HandResult(
                new Hand('TBD', cards.slice(0, 5)),
                HAND_TYPE.STRAIGHT_FLUSH,
                highestRankInStraightFlush
            );
        }
    }

    // No straight flush found
    return undefined;
}

export function getFourOfAKindHand(handDataMap) {
    // Placeholder for four of a kind detection logic
    return undefined;
}

export function getFullHouseHand(handDataMap) {
    // Placeholder for full house detection logic
    return undefined;
}

export function getFlushHand(handDataMap) {
    // Placeholder for flush detection logic
    return undefined;
}

export function getStraightHand(handDataMap) {
    // Placeholder for straight detection logic
    return undefined;
}

export function getThreeOfAKindHand(handDataMap) {
    // Placeholder for three of a kind detection logic
    return undefined;
}

export function getTwoPairHand(handDataMap) {
    // Placeholder for two pair detection logic
    return undefined;
}

export function getOnePairHand(handDataMap) {
    // Placeholder for one pair detection logic
    return undefined;
}

export function getHighCardHand(handDataMap) {
    // Placeholder for high card detection logic
    return undefined;
}
