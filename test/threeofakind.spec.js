import {getThreeOfAKindHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/model.js';
import {SIMPLE_RANK_DISPLAY} from '../src/constants.js';

function expectThreeOfAKind(handDataMap, shouldExist, expectedRank = undefined) {
    const result = getThreeOfAKindHand(handDataMap);
    if (shouldExist) {
        expect(result !== undefined, 'Expected to find three of a kind, but none was found.');
        expect(result.handType === HAND_TYPE.THREE_OF_A_KIND, 'Expected hand type to be THREE_OF_A_KIND.');
        if (expectedRank !== undefined) {
            expect(
                result.rank1 === expectedRank,
                `Expected three of a kind to be rank ${SIMPLE_RANK_DISPLAY[expectedRank]}, got ${
                    SIMPLE_RANK_DISPLAY[result.rank1]
                }.`
            );
        }
    } else {
        expect(result === undefined, 'Expected no three of a kind to be found, but one was detected.');
    }
}

// Positive test cases - should detect three of a kind
it('should detect three Aces (highest possible)', () => {
    const handDataMap = {
        [RANKS.ACE]: [
            {rank: RANKS.ACE, suit: SUITS.HEARTS},
            {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
            {rank: RANKS.ACE, suit: SUITS.CLUBS},
        ],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.ACE);
});

it('should detect three Twos (lowest possible)', () => {
    const handDataMap = {
        [RANKS.TWO]: [
            {rank: RANKS.TWO, suit: SUITS.HEARTS},
            {rank: RANKS.TWO, suit: SUITS.DIAMONDS},
            {rank: RANKS.TWO, suit: SUITS.CLUBS},
        ],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.TWO);
});

it('should detect three Kings with one kicker', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
            {rank: RANKS.KING, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.SPADES}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.KING);
});

it('should detect three Jacks with multiple kickers (choose highest)', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.JACK);
});

it('should detect three Eights in 7-card scenario', () => {
    const handDataMap = {
        [RANKS.EIGHT]: [
            {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
            {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
            {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.EIGHT);
});

it('should detect three Sevens with exactly 3 cards (minimum)', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
        ],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.SEVEN);
});

it('should detect three Tens with a pair also present', () => {
    const handDataMap = {
        [RANKS.TEN]: [
            {rank: RANKS.TEN, suit: SUITS.HEARTS},
            {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.TEN, suit: SUITS.CLUBS},
        ],
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
        ],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.TEN);
});

it('should detect three Nines with two pairs present (choose higher pair as kicker)', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
        ],
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.CLUBS},
            {rank: RANKS.SIX, suit: SUITS.SPADES},
        ],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.NINE);
});

it('should detect three Queens', () => {
    const handDataMap = {
        [RANKS.QUEEN]: [
            {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
            {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
            {rank: RANKS.QUEEN, suit: SUITS.CLUBS},
        ],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.QUEEN);
});

it('should detect three Fours', () => {
    const handDataMap = {
        [RANKS.FOUR]: [
            {rank: RANKS.FOUR, suit: SUITS.HEARTS},
            {rank: RANKS.FOUR, suit: SUITS.DIAMONDS},
            {rank: RANKS.FOUR, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.DIAMONDS}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.FOUR);
});

it('should detect three Sixes when two different trips exist (choose higher)', () => {
    const handDataMap = {
        [RANKS.SIX]: [
            {rank: RANKS.SIX, suit: SUITS.HEARTS},
            {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
            {rank: RANKS.SIX, suit: SUITS.CLUBS},
        ],
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
        ],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.SIX);
});

it('should detect three Threes', () => {
    const handDataMap = {
        [RANKS.THREE]: [
            {rank: RANKS.THREE, suit: SUITS.HEARTS},
            {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
            {rank: RANKS.THREE, suit: SUITS.CLUBS},
        ],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.SPADES}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.THREE);
});

// Negative test cases - should NOT detect three of a kind
it('should not detect three of a kind when only a pair exists', () => {
    const handDataMap = {
        [RANKS.KING]: [
            {rank: RANKS.KING, suit: SUITS.HEARTS},
            {rank: RANKS.KING, suit: SUITS.DIAMONDS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectThreeOfAKind(handDataMap, false);
});

it('should not detect three of a kind when two pairs exist', () => {
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
    expectThreeOfAKind(handDataMap, false);
});

it('should not detect three of a kind with empty hand data map', () => {
    const handDataMap = {};
    expectThreeOfAKind(handDataMap, false);
});

it('should not detect three of a kind when all different ranks exist', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.DIAMONDS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.CLUBS}],
        [RANKS.JACK]: [{rank: RANKS.JACK, suit: SUITS.SPADES}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectThreeOfAKind(handDataMap, false);
});

it('should not detect three of a kind with only one card', () => {
    const handDataMap = {
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
    };
    expectThreeOfAKind(handDataMap, false);
});

it('should not detect three of a kind with only two cards of same rank', () => {
    const handDataMap = {
        [RANKS.SEVEN]: [
            {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
            {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
        ],
    };
    expectThreeOfAKind(handDataMap, false);
});

// Edge cases
it('should detect three of a kind when flush is also possible', () => {
    const handDataMap = {
        [RANKS.JACK]: [
            {rank: RANKS.JACK, suit: SUITS.HEARTS},
            {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
            {rank: RANKS.JACK, suit: SUITS.CLUBS},
        ],
        [RANKS.ACE]: [{rank: RANKS.ACE, suit: SUITS.HEARTS}],
        [RANKS.KING]: [{rank: RANKS.KING, suit: SUITS.HEARTS}],
        [RANKS.QUEEN]: [{rank: RANKS.QUEEN, suit: SUITS.HEARTS}],
        [RANKS.TEN]: [{rank: RANKS.TEN, suit: SUITS.HEARTS}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.JACK);
});

it('should detect three of a kind when straight is also possible', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
        ],
        [RANKS.EIGHT]: [{rank: RANKS.EIGHT, suit: SUITS.SPADES}],
        [RANKS.SEVEN]: [{rank: RANKS.SEVEN, suit: SUITS.HEARTS}],
        [RANKS.SIX]: [{rank: RANKS.SIX, suit: SUITS.DIAMONDS}],
        [RANKS.FIVE]: [{rank: RANKS.FIVE, suit: SUITS.CLUBS}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.NINE);
});

it('should detect three Fives with low kicker', () => {
    const handDataMap = {
        [RANKS.FIVE]: [
            {rank: RANKS.FIVE, suit: SUITS.HEARTS},
            {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
            {rank: RANKS.FIVE, suit: SUITS.CLUBS},
        ],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.SPADES}],
        [RANKS.TWO]: [{rank: RANKS.TWO, suit: SUITS.HEARTS}],
    };
    expectThreeOfAKind(handDataMap, true, RANKS.FIVE);
});
