import {it, expect} from './testutil.test.js';
import {getHandResult} from '../src/util.js';
import {logCards} from '../src/log.js';
import {Card, Hand} from '../src/model.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/types.js';
import {SIMPLE_RANK_DISPLAY, HAND_TYPE_NAMES, SUIT_SYMBOLS} from '../src/constants.js';

const COMPARISON_RESULT = {
    BEATS: 'beats',
    LOSES_TO: 'loses to',
    TIES: 'ties',
};

// Utility functions for hand comparison tests
function describeHandResult(handResult) {
    const handTypeName = HAND_TYPE_NAMES[handResult.handType] || 'Unknown Hand Type';
    const rank1Name = SIMPLE_RANK_DISPLAY[handResult.rank1] || 'Unknown Rank';
    const rank2Name = handResult.rank2 ? SIMPLE_RANK_DISPLAY[handResult.rank2] : undefined;
    let description = `${handTypeName} (High Card: ${rank1Name}`;
    if (rank2Name) {
        description += `, Second Card: ${rank2Name}`;
    }
    description += ')';
    return description;
}

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

function expectHandComparison(hand1, hand2, expectedComparison) {
    const result1 = getHandResult([], new Hand(hand1, 'Player 1'));
    const result2 = getHandResult([], new Hand(hand2, 'Player 2'));

    const comparison = result1.compareTo(result2);
    if (expectedComparison === COMPARISON_RESULT.BEATS) {
        expect(
            comparison > 0,
            `Expected Hand 1 to be greater than Hand 2: ${describeHandResult(result1)} vs ${describeHandResult(
                result2
            )}`
        );
    } else if (expectedComparison === COMPARISON_RESULT.LOSES_TO) {
        expect(
            comparison < 0,
            `Expected Hand 1 to be less than Hand 2: ${describeHandResult(result1)} vs ${describeHandResult(result2)}`
        );
    } else if (expectedComparison === COMPARISON_RESULT.TIES) {
        expect(
            comparison === 0,
            `Expected Hand 1 to be equal to Hand 2: ${describeHandResult(result1)} vs ${describeHandResult(result2)}`
        );
    } else {
        throw new Error('Invalid expectedComparison value. Use "greater", "less", or "equal".');
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

    const result1 = getHandResult(hand1);
    const result2 = getHandResult(hand2);

    expect(result1.handType === HAND_TYPE.STRAIGHT_FLUSH, 'Hand 1 should be a Straight Flush');
    expect(result2.handType === HAND_TYPE.STRAIGHT_FLUSH, 'Hand 2 should be a Straight Flush');
    expect(result1.compareTo(result2) > 0, 'Hand 1 should beat Hand 2');
});
