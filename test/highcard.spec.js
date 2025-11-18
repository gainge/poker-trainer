import {getHighCardHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/types.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectHighCard(handDataMap, shouldExist, expectedHighRank = undefined) {
    const result = getHighCardHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find high card hand, but none was found.');
        expect(result.handType === HAND_TYPE.HIGH_CARD, 'Expected hand type to be HIGH_CARD.');
        if (expectedHighRank !== undefined) {
            expect(
                result.rank1 === expectedHighRank,
                `Expected high card to be rank ${SIMPLE_RANK_DISPLAY[expectedHighRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no high card hand to be found, but one was detected.');
    }
}

// Positive test cases - should detect high card
it('should detect high card with Ace high (highest possible)', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.CLUBS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.SPADES}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.ACE);
});

it('should detect high card with King high', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.DIAMONDS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.CLUBS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.SPADES}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.KING);
});

it('should detect high card with Queen high', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.QUEEN);
});

it('should detect high card with Jack high', () => {
    const handDataMap = {
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.DIAMONDS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.CLUBS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.SPADES}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.JACK);
});

it('should detect high card with Ten high', () => {
    const handDataMap = {
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.SPADES}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.TEN);
});

it('should detect high card with Nine high', () => {
    const handDataMap = {
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.DIAMONDS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.CLUBS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.NINE);
});

it('should detect high card with Eight high', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.EIGHT);
});

it('should detect high card with Seven high (lowest possible)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.SEVEN);
});

it('should detect high card in 7-card scenario with all different ranks', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.HEARTS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.DIAMONDS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
    };
    expectHighCard(handDataMap, true, RANKS.ACE);
});

it('should detect high card with mixed suits', () => {
    const handDataMap = {
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.DIAMONDS}],
        [RANKS.NINE]: [{rank: RANKS.NINE, suit: SUITS.CLUBS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.SPADES}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.KING);
});

// Negative test cases - should NOT detect high card
it('should not detect high card with empty hand data map', () => {
    const handDataMap = {};
    expectHighCard(handDataMap, false);
});

// Edge cases
it('should detect high card with Ace and low cards', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
        [RANKS.FOUR]: [{rank: RANKS.FOUR, suit: SUITS.CLUBS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectHighCard(handDataMap, true, RANKS.ACE);
});

it('should detect high card with Seven high', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.HEARTS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.DIAMONDS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.CLUBS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.SPADES}],
    };
    expectHighCard(handDataMap, true, RANKS.SEVEN);
});
