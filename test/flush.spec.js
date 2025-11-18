import {getFlushHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/types.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectFlush(handDataMap, shouldExist, expectedHighRank = undefined) {
    const result = getFlushHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find a flush, but none was found.');
        expect(result.handType === HAND_TYPE.FLUSH, 'Expected hand type to be FLUSH.');
        if (expectedHighRank !== undefined) {
            expect(
                result.rank1 === expectedHighRank,
                `Expected flush high card to be rank ${SIMPLE_RANK_DISPLAY[expectedHighRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no flush to be found, but one was detected.');
    }
}

// Positive test cases - should detect flush
it('should detect a flush in hearts (Ace-high)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
    };
    expectFlush(handDataMap, true, RANKS.ACE);
});

it('should detect a flush in diamonds (King-high)', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, true, RANKS.KING);
});

it('should detect a flush in clubs (Queen-high)', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
    };
    expectFlush(handDataMap, true, RANKS.QUEEN);
});

it('should detect a flush in spades (Ten-high)', () => {
    const handDataMap = {
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.SPADES}],
    };
    expectFlush(handDataMap, true, RANKS.TEN);
});

it('should detect a flush with exactly 5 cards (minimum)', () => {
    const handDataMap = {
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.HEARTS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectFlush(handDataMap, true, RANKS.NINE);
});

it('should detect a flush with 6 cards of same suit', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, true, RANKS.ACE);
});

it('should detect a flush with 7 cards of same suit', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.CLUBS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.CLUBS}],
    };
    expectFlush(handDataMap, true, RANKS.KING);
});

it('should detect a flush in 7-card scenario with extra cards of different suits', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.SPADES},
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.SPADES}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, true, RANKS.ACE);
});

it('should detect a flush with low cards (Seven-high)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.HEARTS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.HEARTS}],
    };
    expectFlush(handDataMap, true, RANKS.SEVEN);
});

it('should detect a flush when pairs are also present', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.HEARTS},
        ],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, true, RANKS.KING);
});

it('should detect a flush when three of a kind is also present', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.CLUBS},
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.CLUBS}],
    };
    expectFlush(handDataMap, true, RANKS.TEN);
});

it('should detect a flush with all low cards (Six-high)', () => {
    const handDataMap = {
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.SPADES}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.SPADES}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.SPADES}],
    };
    expectFlush(handDataMap, true, RANKS.SIX);
});

// Negative test cases - should NOT detect flush
it('should not detect a flush when only 4 cards of same suit exist', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, false);
});

it('should not detect a flush when all suits are mixed', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectFlush(handDataMap, false);
});

it('should not detect a flush with empty hand data map', () => {
    const handDataMap = {};
    expectFlush(handDataMap, false);
});

it('should not detect a flush when 3 hearts and 3 diamonds exist', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, false);
});

it('should not detect a flush with only one card', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectFlush(handDataMap, false);
});

it('should not detect a flush with only two cards of same suit', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.SPADES}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
    };
    expectFlush(handDataMap, false);
});

it('should not detect a flush with only three cards of same suit', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.CLUBS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.CLUBS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectFlush(handDataMap, false);
});

// Edge cases
it('should detect a flush when two suits each have 4+ cards (choose best)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.SPADES},
        ],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.SPADES},
        ],
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.SPADES},
        ],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.SPADES}],
    };
    expectFlush(handDataMap, true, RANKS.ACE);
});

it('should detect a flush with Jack-high', () => {
    const handDataMap = {
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.DIAMONDS}],
    };
    expectFlush(handDataMap, true, RANKS.JACK);
});

it('should detect a flush with duplicates at same rank', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectFlush(handDataMap, true, RANKS.ACE);
});

it('should detect a flush with Five-high (lowest possible)', () => {
    const handDataMap = {
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.CLUBS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.CLUBS}],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.CLUBS}],
    };
    expectFlush(handDataMap, true, RANKS.ACE);
});
