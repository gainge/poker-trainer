import {getStraightHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/model.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectStraight(handDataMap, shouldExist, expectedHighRank = undefined) {
    const result = getStraightHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find a straight, but none was found.');
        expect(result.handType === HAND_TYPE.STRAIGHT, 'Expected hand type to be STRAIGHT.');
        if (expectedHighRank !== undefined) {
            expect(
                result.rank1 === expectedHighRank,
                `Expected straight to be ${SIMPLE_RANK_DISPLAY[expectedHighRank]} high, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                } high.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no straight to be found, but one was detected.');
    }
}

// Positive test cases - should detect straight
it('should detect a straight (Ace-high, Broadway)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, true, RANKS.ACE);
});

it('should detect a wheel straight (Ace-low, A-2-3-4-5)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.DIAMONDS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.CLUBS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.SPADES}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
    };
    expectStraight(handDataMap, true, RANKS.FIVE);
});

it('should detect a straight (King-high)', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.SPADES}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, true, RANKS.KING);
});

it('should detect a straight (Ten-high)', () => {
    const handDataMap = {
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
    };
    expectStraight(handDataMap, true, RANKS.TEN);
});

it('should detect a straight (Nine-high)', () => {
    const handDataMap = {
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.CLUBS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.SPADES}],
    };
    expectStraight(handDataMap, true, RANKS.NINE);
});

it('should detect a straight (Six-high, lowest non-wheel)', () => {
    const handDataMap = {
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, true, RANKS.SIX);
});

it('should detect a straight with exactly 5 cards (minimum)', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.CLUBS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.SPADES}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.DIAMONDS}],
    };
    expectStraight(handDataMap, true, RANKS.EIGHT);
});

it('should detect a straight in 7-card scenario with extra cards', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.DIAMONDS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.CLUBS}],
    };
    expectStraight(handDataMap, true, RANKS.QUEEN);
});

it('should detect a straight when 6 consecutive ranks exist (choose highest)', () => {
    const handDataMap = {
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.SPADES}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
    };
    expectStraight(handDataMap, true, RANKS.JACK);
});

it('should detect a straight when 7 consecutive ranks exist (choose highest)', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.SPADES}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
    };
    expectStraight(handDataMap, true, RANKS.KING);
});

it('should detect a straight with duplicates at some ranks', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
        ],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.CLUBS}],
    };
    expectStraight(handDataMap, true, RANKS.TEN);
});

it('should detect a straight when pairs are present', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
            {rank: RANKS.FIVE, suit: SUITS.CLUBS},
        ],
    };
    expectStraight(handDataMap, true, RANKS.NINE);
});

it('should detect a straight when three of a kind is present', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
        ],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.SPADES}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
    };
    expectStraight(handDataMap, true, RANKS.JACK);
});

it('should detect a straight (Seven-high)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
    };
    expectStraight(handDataMap, true, RANKS.SEVEN);
});

it('should detect a straight (Queen-high)', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, true, RANKS.QUEEN);
});

// Negative test cases - should NOT detect straight
it('should not detect a straight when only 4 consecutive cards exist', () => {
    const handDataMap = {
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, false);
});

it('should not detect a straight when there is a gap in sequence', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, false);
});

it('should not detect a straight with empty hand data map', () => {
    const handDataMap = {};
    expectStraight(handDataMap, false);
});

it('should not detect a straight when all cards are different ranks (non-consecutive)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, false);
});

it('should not detect a straight with only one card', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, false);
});

it('should not detect a straight with only two consecutive cards', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, false);
});

it('should not detect a straight with only three consecutive cards', () => {
    const handDataMap = {
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
    };
    expectStraight(handDataMap, false);
});

it('should not detect a straight when pairs prevent consecutive sequence', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
    };
    expectStraight(handDataMap, false);
});

// Edge cases
it('should detect a straight when full house is also possible', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.TEN, suit: SUITS.CLUBS},
        ],
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.SPADES},
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
    };
    expectStraight(handDataMap, true, RANKS.TEN);
});

it('should detect a straight when four of a kind is also possible', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
        ],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.SPADES}],
    };
    expectStraight(handDataMap, true, RANKS.EIGHT);
});

it('should detect multiple possible straights (choose highest)', () => {
    const handDataMap = {
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.DIAMONDS}],
    };
    expectStraight(handDataMap, true, RANKS.NINE);
});
