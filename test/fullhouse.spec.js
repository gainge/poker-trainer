import {getFullHouseHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/model.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectFullHouse(handDataMap, shouldExist, expectedTripsRank = undefined, expectedPairRank = undefined) {
    const result = getFullHouseHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find a full house, but none was found.');
        expect(result.handType === HAND_TYPE.FULL_HOUSE, 'Expected hand type to be FULL_HOUSE.');
        if (expectedTripsRank !== undefined) {
            expect(
                result.rank1 === expectedTripsRank,
                `Expected full house trips to be rank ${SIMPLE_RANK_DISPLAY[expectedTripsRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
        if (expectedPairRank !== undefined) {
            expect(
                result.rank2 === expectedPairRank,
                `Expected full house pair to be rank ${SIMPLE_RANK_DISPLAY[expectedPairRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank2]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no full house to be found, but one was detected.');
    }
}

// Positive test cases - should detect full house
it('should detect full house with Aces full of Kings (highest possible)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
            {rank: RANKS.ACE, suit: SUITS.CLUBS},
        ],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.ACE, RANKS.KING);
});

it('should detect full house with Twos full of Threes (lowest possible)', () => {
    const handDataMap = {
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.HEARTS},
            {rank: RANKS.TWO, suit: SUITS.DIAMONDS},
            {rank: RANKS.TWO, suit: SUITS.CLUBS},
        ],
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.TWO, RANKS.THREE);
});

it('should detect full house with Jacks full of Sixes', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.SPADES},
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
        ],
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
            {rank: RANKS.SIX, suit: SUITS.SPADES},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.JACK, RANKS.SIX);
});

it('should detect full house with Queens full of Tens', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.QUEEN, suit: SUITS.CLUBS},
        ],
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.QUEEN, RANKS.TEN);
});

it('should detect full house in 7-card scenario with extra kicker', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
        ],
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.SPADES}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
    };
    expectFullHouse(handDataMap, true, RANKS.EIGHT, RANKS.FIVE);
});

it('should detect full house when two different pairs are present (choose higher pair)', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
        ],
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
            {rank: RANKS.FOUR, suit: SUITS.SPADES},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.NINE, RANKS.SEVEN);
});

it('should detect full house when two different trips are present (choose higher as trips)', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
        ],
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
            {rank: RANKS.FIVE, suit: SUITS.CLUBS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.KING, RANKS.FIVE);
});

it('should detect full house with Sevens full of Aces', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.SEVEN, RANKS.ACE);
});

it('should detect full house with exactly 5 cards (minimum)', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.TEN, suit: SUITS.CLUBS},
        ],
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.SPADES},
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.TEN, RANKS.THREE);
});

it('should detect full house with Fours full of Nines', () => {
    const handDataMap = {
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.HEARTS},
            {rank: RANKS.FOUR, suit: SUITS.DIAMONDS},
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
        ],
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.SPADES},
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.FOUR, RANKS.NINE);
});

it('should detect full house when flush is also possible', () => {
    const handDataMap = {
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.HEARTS},
            {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
            {rank: RANKS.SIX, suit: SUITS.CLUBS},
        ],
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.HEARTS},
            {rank: RANKS.TWO, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
    };
    expectFullHouse(handDataMap, true, RANKS.SIX, RANKS.TWO);
});

it('should detect full house when straight is also possible', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
        ],
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
    };
    expectFullHouse(handDataMap, true, RANKS.SEVEN, RANKS.EIGHT);
});

// Negative test cases - should NOT detect full house
it('should not detect full house when only three of a kind present', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
    };
    expectFullHouse(handDataMap, false);
});

it('should not detect full house when only two pairs present', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectFullHouse(handDataMap, false);
});

it('should not detect full house when only one pair present', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectFullHouse(handDataMap, false);
});

it('should not detect full house with empty hand data map', () => {
    const handDataMap = {};
    expectFullHouse(handDataMap, false);
});

it('should not detect full house when four of a kind present', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
    };
    expectFullHouse(handDataMap, false);
});

it('should not detect full house when all different ranks present', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectFullHouse(handDataMap, false);
});

it('should not detect full house with only three cards (all same rank)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
        ],
    };
    expectFullHouse(handDataMap, false);
});

it('should not detect full house with only two cards', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, false);
});

// Edge cases
it('should detect full house when trips and three pairs present (best combination)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
            {rank: RANKS.ACE, suit: SUITS.CLUBS},
        ],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.ACE, RANKS.KING);
});

it('should detect full house with Kings full of Twos', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
        ],
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.SPADES},
            {rank: RANKS.TWO, suit: SUITS.HEARTS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.KING, RANKS.TWO);
});

it('should detect full house with Threes full of Aces', () => {
    const handDataMap = {
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
    };
    expectFullHouse(handDataMap, true, RANKS.THREE, RANKS.ACE);
});
