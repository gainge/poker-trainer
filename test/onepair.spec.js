import {getOnePairHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/model.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectOnePair(handDataMap, shouldExist, expectedPairRank = undefined, expectedKicker = undefined) {
    const result = getOnePairHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find one pair, but none was found.');
        expect(result.handType === HAND_TYPE.ONE_PAIR, 'Expected hand type to be ONE_PAIR.');
        if (expectedPairRank !== undefined) {
            expect(
                result.rank1 === expectedPairRank,
                `Expected pair to be rank ${SIMPLE_RANK_DISPLAY[expectedPairRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
        if (expectedKicker !== undefined) {
            expect(
                result.rank2 === expectedKicker,
                `Expected kicker to be rank ${SIMPLE_RANK_DISPLAY[expectedKicker]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank2]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no one pair to be found, but one was detected.');
    }
}

// Positive test cases - should detect one pair
it('should detect a pair of Aces (highest possible)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
    };
    expectOnePair(handDataMap, true, RANKS.ACE);
});

it('should detect a pair of Twos (lowest possible)', () => {
    const handDataMap = {
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.HEARTS},
            {rank: RANKS.TWO, suit: SUITS.DIAMONDS},
        ],
    };
    expectOnePair(handDataMap, true, RANKS.TWO);
});

it('should detect a pair of Kings with one kicker', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.KING, RANKS.ACE);
});

it('should detect a pair of Queens with multiple kickers (choose highest)', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.CLUBS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
    };
    expectOnePair(handDataMap, true, RANKS.QUEEN, RANKS.ACE);
});

it('should detect a pair of Jacks with exactly 2 cards (minimum)', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
        ],
    };
    expectOnePair(handDataMap, true, RANKS.JACK);
});

it('should detect a pair of Tens in 7-card scenario', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.CLUBS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.TEN, RANKS.ACE);
});

it('should detect a pair of Nines', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.NINE, RANKS.KING);
});

it('should detect a pair of Eights', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.CLUBS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.SPADES}],
    };
    expectOnePair(handDataMap, true, RANKS.EIGHT, RANKS.ACE);
});

it('should detect a pair of Sevens', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.SEVEN, RANKS.QUEEN);
});

it('should detect a pair of Sixes', () => {
    const handDataMap = {
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.HEARTS},
            {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
        ],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.SIX, RANKS.JACK);
});

it('should detect a pair of Fives', () => {
    const handDataMap = {
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.FIVE, RANKS.TEN);
});

it('should detect a pair of Fours', () => {
    const handDataMap = {
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.HEARTS},
            {rank: RANKS.FOUR, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.FOUR, RANKS.NINE);
});

it('should detect a pair of Threes', () => {
    const handDataMap = {
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.THREE, RANKS.EIGHT);
});

it('should detect a pair when multiple pairs exist (choose highest)', () => {
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
    expectOnePair(handDataMap, true, RANKS.ACE, RANKS.KING);
});

// Negative test cases - should NOT detect one pair
it('should not detect one pair when all different ranks exist', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectOnePair(handDataMap, false);
});

it('should not detect one pair with empty hand data map', () => {
    const handDataMap = {};
    expectOnePair(handDataMap, false);
});

it('should not detect one pair when three of a kind exists', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
        ],
    };
    expectOnePair(handDataMap, false);
});

it('should not detect one pair when four of a kind exists', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
        ],
    };
    expectOnePair(handDataMap, false);
});

it('should not detect one pair when two pairs exist', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.CLUBS},
            {rank: RANKS.QUEEN, suit: SUITS.SPADES},
        ],
    };
    expectOnePair(handDataMap, false);
});

it('should not detect one pair when full house exists', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
        ],
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
        ],
    };
    expectOnePair(handDataMap, false);
});

it('should not detect one pair with only one card', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectOnePair(handDataMap, false);
});

it('should not detect one pair with only three different cards', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, false);
});

// Edge cases
it('should detect a pair when flush is also possible', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectOnePair(handDataMap, true, RANKS.KING, RANKS.ACE);
});

it('should detect a pair when straight is also possible', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
    };
    expectOnePair(handDataMap, true, RANKS.NINE, RANKS.EIGHT);
});

it('should detect a pair with low kicker', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.CLUBS}],
    };
    expectOnePair(handDataMap, true, RANKS.ACE, RANKS.TWO);
});

it('should detect a pair when three pairs exist (choose highest)', () => {
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
    expectOnePair(handDataMap, true, RANKS.ACE, RANKS.KING);
});
