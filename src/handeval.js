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
    const resultCards = [];
    let topKicker = undefined;

    // Iterate over ranks in descending order to find four of a kind with top kicker
    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        if (cardsAtRank.length === 4 && resultCards.length === 0) {
            resultCards.push(...cardsAtRank);
        } else if (cardsAtRank.length > 0) {
            if (topKicker === undefined) {
                topKicker = cardsAtRank[0]; // Store top kicker
            }
        }
    }

    if (topKicker !== undefined && resultCards.length === 4) {
        resultCards.push(topKicker);
    }

    if (resultCards.length >= 4) {
        return new HandResult(
            new Hand('TBD', resultCards.slice(0, 5)),
            HAND_TYPE.FOUR_OF_A_KIND,
            resultCards[0].rank,
            resultCards[4]?.rank
        );
    }
    return undefined;
}

export function getFullHouseHand(handDataMap) {
    let threeOfAKindRank = undefined;
    let pairRank = undefined;

    // Find the highest three of a kind and pair
    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        if (cardsAtRank.length >= 3 && threeOfAKindRank === undefined) {
            threeOfAKindRank = rank;
        } else if (cardsAtRank.length >= 2 && rank !== threeOfAKindRank && pairRank === undefined) {
            pairRank = rank;
        }
        if (threeOfAKindRank !== undefined && pairRank !== undefined) {
            break;
        }
    }

    if (threeOfAKindRank !== undefined && pairRank !== undefined) {
        const resultCards = [...handDataMap[threeOfAKindRank].slice(0, 3), ...handDataMap[pairRank].slice(0, 2)];
        return new HandResult(new Hand('TBD', resultCards), HAND_TYPE.FULL_HOUSE, threeOfAKindRank, pairRank);
    }

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
