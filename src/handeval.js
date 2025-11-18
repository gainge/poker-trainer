import {
    RANKS,
    SUITS,
    HAND_TYPE,
    HandResult,
    RANKS_DESCENDING,
    Card,
    Hand,
    StraightFlushResult,
    FourOfAKindResult,
    FullHouseResult,
    FlushResult,
    StraightResult,
    ThreeOfAKindResult,
    TwoPairResult,
    OnePairResult,
    HighCardResult,
} from './model.js';

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
            return new StraightFlushResult(new Hand(cards.slice(0, 5)), highestRankInStraightFlush);
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
        return new FourOfAKindResult(new Hand(resultCards.slice(0, 5)), resultCards[0].rank, resultCards[4]?.rank);
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
        return new FullHouseResult(new Hand(resultCards), threeOfAKindRank, pairRank);
    }

    // Placeholder for full house detection logic
    return undefined;
}

export function getFlushHand(handDataMap) {
    // We'll early return for first flush found
    const suits = [SUITS.HEARTS, SUITS.DIAMONDS, SUITS.CLUBS, SUITS.SPADES];
    const suitCountMap = {};
    for (const suit of suits) {
        suitCountMap[suit] = 0;
    }
    const suitHighCardMap = {};

    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        for (const card of cardsAtRank) {
            suitCountMap[card.suit]++;
            if (!(card.suit in suitHighCardMap)) {
                suitHighCardMap[card.suit] = [];
            }
            suitHighCardMap[card.suit].push(card);
        }
    }

    // Assume only one flush possible (7 card hand), return first found
    for (const suit of suits) {
        if (suitCountMap[suit] >= 5) {
            const flushCards = suitHighCardMap[suit].slice(0, 5);
            return new FlushResult(new Hand(flushCards), flushCards[0].rank);
        }
    }

    // Placeholder for flush detection logic
    return undefined;
}

export function getStraightHand(handDataMap) {
    const cardsInStraight = [];

    for (const rank of [...RANKS_DESCENDING, RANKS.ACE]) {
        const cardsAtRank = handDataMap[rank] ?? [];
        if (cardsAtRank.length > 0) {
            cardsInStraight.push(cardsAtRank[0]); // Just need one card of that rank
            if (cardsInStraight.length >= 5) {
                break;
            }
        } else {
            cardsInStraight.length = 0;
        }
    }

    if (cardsInStraight.length >= 5) {
        return new StraightResult(new Hand(cardsInStraight.slice(0, 5)), cardsInStraight[0].rank);
    }

    // Placeholder for straight detection logic
    return undefined;
}

export function getThreeOfAKindHand(handDataMap) {
    // Return the highest three of a kind found
    let resultCards = [];
    let kickerCards = [];

    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        if (cardsAtRank.length >= 3 && resultCards.length === 0) {
            resultCards = cardsAtRank.slice(0, 3);
        } else if (cardsAtRank.length > 0) {
            kickerCards.push(...cardsAtRank);
        }
        if (resultCards.length === 3 && kickerCards.length >= 2) {
            break;
        }
    }

    if (resultCards.length === 3) {
        // Add top 2 kickers
        kickerCards[0] && resultCards.push(kickerCards[0]);
        kickerCards[1] && resultCards.push(kickerCards[1]);
        return new ThreeOfAKindResult(new Hand(resultCards.slice(0, 5)), resultCards[0].rank);
    }

    return undefined;
}

export function getTwoPairHand(handDataMap) {
    const highPair = [];
    const lowPair = [];
    let kicker = undefined;

    // Iterate over ranks in descending order to find two pairs
    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        if (cardsAtRank.length >= 2) {
            if (highPair.length === 0) {
                highPair.push(...cardsAtRank.slice(0, 2));
            } else if (lowPair.length === 0) {
                lowPair.push(...cardsAtRank.slice(0, 2));
            } else if (kicker === undefined) {
                kicker = cardsAtRank[0];
            }
        }
        if (highPair.length === 2 && lowPair.length === 2 && kicker !== undefined) {
            break;
        }
    }

    if (highPair.length === 2 && lowPair.length === 2) {
        const resultCards = [...highPair, ...lowPair];
        if (kicker !== undefined) {
            resultCards.push(kicker);
        }
        return new TwoPairResult(new Hand(resultCards.slice(0, 5)), highPair[0].rank, lowPair[0].rank);
    }

    // Placeholder for two pair detection logic
    return undefined;
}

export function getOnePairHand(handDataMap) {
    // Return the highest pair found
    let resultCards = [];
    let kickerCards = [];

    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        if (cardsAtRank.length >= 2 && resultCards.length === 0) {
            resultCards = cardsAtRank.slice(0, 2);
        } else if (cardsAtRank.length > 0) {
            kickerCards.push(...cardsAtRank);
        }
        if (resultCards.length === 2 && kickerCards.length >= 3) {
            break;
        }
    }

    if (resultCards.length === 2) {
        // Add top 3 kickers
        kickerCards[0] && resultCards.push(kickerCards[0]);
        kickerCards[1] && resultCards.push(kickerCards[1]);
        kickerCards[2] && resultCards.push(kickerCards[2]);
        return new OnePairResult(new Hand(resultCards.slice(0, 5)), resultCards[0].rank);
    }

    return undefined;
}

export function getHighCardHand(handDataMap) {
    const resultCards = [];

    for (const rank of RANKS_DESCENDING) {
        const cardsAtRank = handDataMap[rank] ?? [];
        resultCards.push(...cardsAtRank);
        if (resultCards.length >= 5) {
            break;
        }
    }

    if (resultCards.length >= 5) {
        return new HighCardResult(new Hand(resultCards.slice(0, 5)), resultCards[0].rank);
    }

    return undefined;
}
