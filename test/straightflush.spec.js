import {getStraightFlushHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/types.js';

/**
 * Test suite for straight flush detection
 *
 * @file straightflush.spec.js
 */

function expectStraightFlush(handDataMap, shouldExist, expectedHighRank = undefined) {
    const result = getStraightFlushHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find a straight flush, but none was found.');
        expect(result.handType === HAND_TYPE.STRAIGHT_FLUSH, 'Expected hand type to be STRAIGHT_FLUSH.');
        if (expectedHighRank !== undefined) {
            expect(result.rank1 === expectedHighRank, `Expected straight flush to be ${expectedHighRank} high.`);
        }
    } else {
        expect(result === undefined, 'Expected no straight flush to be found, but one was detected.');
    }
}

it('should detect a straight flush in hearts', () => {
    const handDataMap = {
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectStraightFlush(handDataMap, true, RANKS.ACE);
});

it('should not detect a straight flush when none exists', () => {
    const handDataMap = {
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectStraightFlush(handDataMap, false);
});

it('should detect a straight flush in spades', () => {
    const handDataMap = {
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.SPADES}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.SPADES}],
    };
    expectStraightFlush(handDataMap, true, RANKS.TEN);
});

it('should not detect a straight flush with mixed suits', () => {
    const handDataMap = {
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.HEARTS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.DIAMONDS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
    };
    expectStraightFlush(handDataMap, false);
});

it('should detect a straight flush with multiple cards of same rank', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.SPADES}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.SPADES}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
    };
    expectStraightFlush(handDataMap, true, RANKS.KING);
});

it('should detect a wheel straight flush (A-2-3-4-5)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.DIAMONDS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.DIAMONDS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.DIAMONDS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
    };
    expectStraightFlush(handDataMap, true, RANKS.FIVE);
});

it('should not detect a straight flush when only four consecutive cards of same suit exist', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.CLUBS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
    };
    expectStraightFlush(handDataMap, false);
});

it('should detect a straight flush when multiple suits have potential straights', () => {
    const handDataMap = {
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.HEARTS},
            {rank: RANKS.SIX, suit: SUITS.SPADES},
        ],
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.SPADES},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
    };
    expectStraightFlush(handDataMap, true, RANKS.NINE);
});

it('should not detect a straight flush in an empty hand data map', () => {
    const handDataMap = {};
    expectStraightFlush(handDataMap, false);
});

it('should detect a straight flush even with more than five cards in sequence', () => {
    const handDataMap = {
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
    };
    expectStraightFlush(handDataMap, true, RANKS.JACK);
});

it('should detect a straight flush with extra non-contributing cards', () => {
    const handDataMap = {
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.SPADES}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.DIAMONDS}],
    };
    expectStraightFlush(handDataMap, true, RANKS.SEVEN);
});
