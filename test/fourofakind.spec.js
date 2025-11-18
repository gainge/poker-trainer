import {getFourOfAKindHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/types.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectFourOfAKind(handDataMap, shouldExist, expectedRank = undefined) {
    const result = getFourOfAKindHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find four of a kind, but none was found.');
        expect(result.handType === HAND_TYPE.FOUR_OF_A_KIND, 'Expected hand type to be FOUR_OF_A_KIND.');
        if (expectedRank !== undefined) {
            expect(
                result.rank1 === expectedRank,
                `Expected four of a kind to be rank ${SIMPLE_RANK_DISPLAY[expectedRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no four of a kind to be found, but one was detected.');
    }
}

// Positive test cases - should detect four of a kind
it('should detect four Aces (highest possible four of a kind)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
            {rank: RANKS.ACE, suit: SUITS.CLUBS},
            {rank: RANKS.ACE, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.ACE);
});

it('should detect four Twos (lowest possible four of a kind)', () => {
    const handDataMap = {
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.HEARTS},
            {rank: RANKS.TWO, suit: SUITS.DIAMONDS},
            {rank: RANKS.TWO, suit: SUITS.CLUBS},
            {rank: RANKS.TWO, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.TWO);
});

it('should detect four Sevens (middle rank)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
            {rank: RANKS.SEVEN, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.SEVEN);
});

it('should detect four Kings', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
            {rank: RANKS.KING, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.KING);
});

it('should detect four of a kind with one kicker (5-card hand)', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
    };
    expectFourOfAKind(handDataMap, true, RANKS.NINE);
});

it('should detect four of a kind with a pair also present', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
            {rank: RANKS.JACK, suit: SUITS.SPADES},
        ],
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.JACK);
});

it("should detect four of a kind in 7-card scenario (Texas Hold'em)", () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
            {rank: RANKS.EIGHT, suit: SUITS.SPADES},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
    };
    expectFourOfAKind(handDataMap, true, RANKS.EIGHT);
});

it('should detect four Fives with multiple extra cards', () => {
    const handDataMap = {
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
            {rank: RANKS.FIVE, suit: SUITS.CLUBS},
            {rank: RANKS.FIVE, suit: SUITS.SPADES},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
    };
    expectFourOfAKind(handDataMap, true, RANKS.FIVE);
});

it('should detect four Tens with two pairs present', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.TEN, suit: SUITS.CLUBS},
            {rank: RANKS.TEN, suit: SUITS.SPADES},
        ],
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.HEARTS},
            {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
        ],
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
            {rank: RANKS.FOUR, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.TEN);
});

it('should detect four Queens with three of a kind also present', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.QUEEN, suit: SUITS.CLUBS},
            {rank: RANKS.QUEEN, suit: SUITS.SPADES},
        ],
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.QUEEN);
});

// Negative test cases - should NOT detect four of a kind
it('should not detect four of a kind when only three of a kind present', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectFourOfAKind(handDataMap, false);
});

it('should not detect four of a kind when only two pairs present', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
        ],
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, false);
});

it('should not detect four of a kind with empty hand data map', () => {
    const handDataMap = {};
    expectFourOfAKind(handDataMap, false);
});

it('should not detect four of a kind when full house present (three + pair)', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
        ],
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.HEARTS},
            {rank: RANKS.FOUR, suit: SUITS.DIAMONDS},
        ],
    };
    expectFourOfAKind(handDataMap, false);
});

it('should not detect four of a kind when five different ranks present', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectFourOfAKind(handDataMap, false);
});

it('should not detect four of a kind with only one card', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectFourOfAKind(handDataMap, false);
});

it('should not detect four of a kind with only two of a kind', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
        ],
    };
    expectFourOfAKind(handDataMap, false);
});

// Edge cases
it('should detect four of a kind with exactly four cards (minimum valid)', () => {
    const handDataMap = {
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.HEARTS},
            {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
            {rank: RANKS.SIX, suit: SUITS.CLUBS},
            {rank: RANKS.SIX, suit: SUITS.SPADES},
        ],
    };
    expectFourOfAKind(handDataMap, true, RANKS.SIX);
});

it('should detect four of a kind when straight is also present', () => {
    const handDataMap = {
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.HEARTS},
            {rank: RANKS.FOUR, suit: SUITS.DIAMONDS},
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
            {rank: RANKS.FOUR, suit: SUITS.SPADES},
        ],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.CLUBS}],
    };
    expectFourOfAKind(handDataMap, true, RANKS.FOUR);
});

it('should detect four of a kind when flush is also possible', () => {
    const handDataMap = {
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
            {rank: RANKS.THREE, suit: SUITS.SPADES},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
    };
    expectFourOfAKind(handDataMap, true, RANKS.THREE);
});

it('should detect four Jacks with all suits represented', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
            {rank: RANKS.JACK, suit: SUITS.SPADES},
        ],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectFourOfAKind(handDataMap, true, RANKS.JACK);
});
