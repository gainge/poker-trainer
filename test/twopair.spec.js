import {getTwoPairHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/model.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectTwoPair(handDataMap, shouldExist, expectedHighPair = undefined, expectedLowPair = undefined) {
    const result = getTwoPairHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find two pair, but none was found.');
        expect(result.handType === HAND_TYPE.TWO_PAIR, 'Expected hand type to be TWO_PAIR.');
        if (expectedHighPair !== undefined) {
            expect(
                result.rank1 === expectedHighPair,
                `Expected high pair to be rank ${SIMPLE_RANK_DISPLAY[expectedHighPair]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
        if (expectedLowPair !== undefined) {
            expect(
                result.rank2 === expectedLowPair,
                `Expected low pair to be rank ${SIMPLE_RANK_DISPLAY[expectedLowPair]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank2]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no two pair to be found, but one was detected.');
    }
}

// Positive test cases - should detect two pair
it('should detect two pair (Aces and Kings, highest possible)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.CLUBS},
            {rank: RANKS.KING, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.ACE, RANKS.KING);
});

it('should detect two pair (Threes and Twos, lowest possible)', () => {
    const handDataMap = {
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.CLUBS},
            {rank: RANKS.TWO, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.THREE, RANKS.TWO);
});

it('should detect two pair (Queens and Jacks)', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
            {rank: RANKS.JACK, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.QUEEN, RANKS.JACK);
});

it('should detect two pair (Tens and Fives)', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.CLUBS},
            {rank: RANKS.FIVE, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.TEN, RANKS.FIVE);
});

it('should detect two pair with exactly 4 cards (minimum)', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
            {rank: RANKS.SEVEN, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.NINE, RANKS.SEVEN);
});

it('should detect two pair with one kicker', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, true, RANKS.KING, RANKS.EIGHT);
});

it('should detect two pair in 7-card scenario with multiple kickers', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
        ],
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.CLUBS},
            {rank: RANKS.SIX, suit: SUITS.SPADES},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectTwoPair(handDataMap, true, RANKS.JACK, RANKS.SIX);
});

it('should detect two pair when three pairs exist (choose top two)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.CLUBS},
            {rank: RANKS.KING, suit: SUITS.SPADES},
        ],
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.ACE, RANKS.KING);
});

it('should detect two pair when four pairs exist (choose top two)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.CLUBS},
            {rank: RANKS.KING, suit: SUITS.SPADES},
        ],
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
            {rank: RANKS.JACK, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.ACE, RANKS.KING);
});

it('should detect two pair (Eights and Threes)', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
        ],
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
            {rank: RANKS.THREE, suit: SUITS.SPADES},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, true, RANKS.EIGHT, RANKS.THREE);
});

it('should detect two pair (Aces and Twos)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.CLUBS},
            {rank: RANKS.TWO, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.ACE, RANKS.TWO);
});

it('should detect two pair (Sevens and Fours)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
            {rank: RANKS.FOUR, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.SEVEN, RANKS.FOUR);
});

// Negative test cases - should NOT detect two pair
it('should not detect two pair when only one pair exists', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
    };
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair with empty hand data map', () => {
    const handDataMap = {};
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair when three of a kind exists', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair when four of a kind exists', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair when all different ranks exist', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair with only one card', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair with only two cards of same rank', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
        ],
    };
    expectTwoPair(handDataMap, false);
});

it('should not detect two pair with only three cards (all different)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectTwoPair(handDataMap, false);
});

// Edge cases
it('should detect two pair when flush is also possible', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, true, RANKS.KING, RANKS.QUEEN);
});

it('should detect two pair when straight is also possible', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.CLUBS}],
    };
    expectTwoPair(handDataMap, true, RANKS.TEN, RANKS.NINE);
});

it('should detect two pair (Fives and Threes)', () => {
    const handDataMap = {
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
            {rank: RANKS.THREE, suit: SUITS.SPADES},
        ],
    };
    expectTwoPair(handDataMap, true, RANKS.FIVE, RANKS.THREE);
});

it('should detect two pair (Kings and Fours)', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
            {rank: RANKS.FOUR, suit: SUITS.SPADES},
        ],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectTwoPair(handDataMap, true, RANKS.KING, RANKS.FOUR);
});
