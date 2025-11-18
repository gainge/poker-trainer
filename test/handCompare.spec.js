import {it, expect} from './testutil.test.js';
import {getHandResult} from '../src/util.js';
import {Card, Hand} from '../src/model.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/types.js';

const COMPARISON_RESULT = {
    BEATS: 'beats',
    LOSES_TO: 'loses to',
    TIES: 'ties',
};

function comparisonExpectationString(expectedComparison, hand1Desc, hand2Desc) {
    if (expectedComparison === COMPARISON_RESULT.BEATS) {
        return `Expected Hand 1 (${hand1Desc}) to beat Hand 2 (${hand2Desc})`;
    } else if (expectedComparison === COMPARISON_RESULT.LOSES_TO) {
        return `Expected Hand 1 (${hand1Desc}) to lose to Hand 2 (${hand2Desc})`;
    } else if (expectedComparison === COMPARISON_RESULT.TIES) {
        return `Expected Hand 1 (${hand1Desc}) to tie with Hand 2 (${hand2Desc})`;
    } else {
        throw new Error('Invalid expectedComparison value. Use "beats", "loses to", or "ties".');
    }
}

function expectHandComparison(hand1, expectedComparison, hand2) {
    const result1 = getHandResult([], new Hand(hand1, 'Player 1'));
    const result2 = getHandResult([], new Hand(hand2, 'Player 2'));

    const comparison = result1.compareTo(result2);
    if (expectedComparison === COMPARISON_RESULT.BEATS) {
        expect(comparison > 0, `Expected Hand 1 to beat Hand 2: ${result1.toString()} vs ${result2.toString()}`);
    } else if (expectedComparison === COMPARISON_RESULT.LOSES_TO) {
        expect(comparison < 0, `Expected Hand 1 to lose to Hand 2: ${result1.toString()} vs ${result2.toString()}`);
    } else if (expectedComparison === COMPARISON_RESULT.TIES) {
        expect(comparison === 0, `Expected Hand 1 to tie Hand 2: ${result1.toString()} vs ${result2.toString()}`);
    } else {
        throw new Error(
            `Invalid expectedComparison value. Use ${COMPARISON_RESULT.BEATS}, ${COMPARISON_RESULT.LOSES_TO}, or ${COMPARISON_RESULT.TIES}.`
        );
    }
}

// Straight Flush hand comparisons
it('compares two Straight Flush hands correctly', () => {
    const hand1 = [
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];
    const hand2 = [
        new Card(RANKS.NINE, SUITS.SPADES),
        new Card(RANKS.TEN, SUITS.SPADES),
        new Card(RANKS.JACK, SUITS.SPADES),
        new Card(RANKS.QUEEN, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.SPADES),
    ];

    expectHandComparison(hand1, COMPARISON_RESULT.BEATS, hand2);
});
