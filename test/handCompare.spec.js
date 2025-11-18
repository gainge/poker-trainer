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

// ============================================================================
// #region CROSS-RANK: Different Hand Types
// ============================================================================

it('Straight Flush beats Four of a Kind', () => {
    const straightFlush = [
        new Card(RANKS.FIVE, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
    ];
    const fourOfAKind = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];

    expectHandComparison(straightFlush, COMPARISON_RESULT.BEATS, fourOfAKind);
});

it('Four of a Kind beats Full House', () => {
    const fourOfAKind = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.SPADES),
        new Card(RANKS.THREE, SUITS.HEARTS),
    ];
    const fullHouse = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
    ];

    expectHandComparison(fourOfAKind, COMPARISON_RESULT.BEATS, fullHouse);
});

it('Full House beats Flush', () => {
    const fullHouse = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
    ];
    const flush = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
    ];

    expectHandComparison(fullHouse, COMPARISON_RESULT.BEATS, flush);
});

it('Flush beats Straight', () => {
    const flush = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.HEARTS),
    ];
    const straight = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.SPADES),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(flush, COMPARISON_RESULT.BEATS, straight);
});

it('Straight beats Three of a Kind', () => {
    const straight = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.SPADES),
        new Card(RANKS.FIVE, SUITS.HEARTS),
    ];
    const threeOfAKind = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(straight, COMPARISON_RESULT.BEATS, threeOfAKind);
});

it('Three of a Kind beats Two Pair', () => {
    const threeOfAKind = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];
    const twoPair = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(threeOfAKind, COMPARISON_RESULT.BEATS, twoPair);
});

it('Two Pair beats One Pair', () => {
    const twoPair = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];
    const onePair = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
    ];

    expectHandComparison(twoPair, COMPARISON_RESULT.BEATS, onePair);
});

it('One Pair beats High Card', () => {
    const onePair = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const highCard = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
    ];

    expectHandComparison(onePair, COMPARISON_RESULT.BEATS, highCard);
});

// ============================================================================
// #region STRAIGHT FLUSH
// ============================================================================

it('Royal Flush beats King-high Straight Flush', () => {
    const royalFlush = [
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];
    const kingHighStraightFlush = [
        new Card(RANKS.NINE, SUITS.SPADES),
        new Card(RANKS.TEN, SUITS.SPADES),
        new Card(RANKS.JACK, SUITS.SPADES),
        new Card(RANKS.QUEEN, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.SPADES),
    ];

    expectHandComparison(royalFlush, COMPARISON_RESULT.BEATS, kingHighStraightFlush);
});

it('Six-high Straight Flush beats Wheel Straight Flush (5-high)', () => {
    const sixHighStraightFlush = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
    ];
    const wheelStraightFlush = [
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];

    expectHandComparison(sixHighStraightFlush, COMPARISON_RESULT.BEATS, wheelStraightFlush);
});

it('Identical Straight Flushes tie', () => {
    const straightFlush1 = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
    ];
    const straightFlush2 = [
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
    ];

    expectHandComparison(straightFlush1, COMPARISON_RESULT.TIES, straightFlush2);
});

// ============================================================================
// #region FOUR OF A KIND
// ============================================================================

it('Aces Four of a Kind beats Kings Four of a Kind', () => {
    const aceQuads = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const kingQuads = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];

    expectHandComparison(aceQuads, COMPARISON_RESULT.BEATS, kingQuads);
});

it('Threes Four of a Kind beats Twos Four of a Kind', () => {
    const threeQuads = [
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];
    const twoQuads = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.SPADES),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];

    expectHandComparison(threeQuads, COMPARISON_RESULT.BEATS, twoQuads);
});

it('Same quads, Ace kicker beats King kicker', () => {
    const aceKicker = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];
    const kingKicker = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];

    expectHandComparison(aceKicker, COMPARISON_RESULT.BEATS, kingKicker);
});

it('Identical Four of a Kind tie', () => {
    const quads1 = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.JACK, SUITS.HEARTS),
    ];
    const quads2 = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
    ];

    expectHandComparison(quads1, COMPARISON_RESULT.TIES, quads2);
});

// ============================================================================
// #region FULL HOUSE
// ============================================================================

it('Aces full of Twos beats Kings full of Aces', () => {
    const acesFull = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
    ];
    const kingsFull = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
    ];

    expectHandComparison(acesFull, COMPARISON_RESULT.BEATS, kingsFull);
});

it('Threes full of Twos beats Twos full of Aces', () => {
    const threesFull = [
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
    ];
    const twosFull = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
    ];

    expectHandComparison(threesFull, COMPARISON_RESULT.BEATS, twosFull);
});

it('Same trips, Aces pair beats Kings pair', () => {
    const ninesFullAces = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
    ];
    const ninesFullKings = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
    ];

    expectHandComparison(ninesFullAces, COMPARISON_RESULT.BEATS, ninesFullKings);
});

it('Identical Full House tie', () => {
    const fullHouse1 = [
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];
    const fullHouse2 = [
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.SPADES),
    ];

    expectHandComparison(fullHouse1, COMPARISON_RESULT.TIES, fullHouse2);
});

// ============================================================================
// #region FLUSH
// ============================================================================

it('Ace-high Flush beats King-high Flush', () => {
    const aceHighFlush = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.HEARTS),
    ];
    const kingHighFlush = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];

    expectHandComparison(aceHighFlush, COMPARISON_RESULT.BEATS, kingHighFlush);
});

it('Flush: same high card, second kicker determines winner', () => {
    const queenKicker = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.HEARTS),
    ];
    const jackKicker = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
    ];

    expectHandComparison(queenKicker, COMPARISON_RESULT.BEATS, jackKicker);
});

it('Flush: decided by third kicker', () => {
    const eightKicker = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.HEARTS),
    ];
    const sevenKicker = [
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];

    expectHandComparison(eightKicker, COMPARISON_RESULT.BEATS, sevenKicker);
});

it('Flush: decided by fourth kicker', () => {
    const nineKicker = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.HEARTS),
    ];
    const eightKicker = [
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];

    expectHandComparison(nineKicker, COMPARISON_RESULT.BEATS, eightKicker);
});

it('Flush: decided by fifth kicker', () => {
    const sixKicker = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
    ];
    const fiveKicker = [
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];

    expectHandComparison(sixKicker, COMPARISON_RESULT.BEATS, fiveKicker);
});

it('Identical Flush tie', () => {
    const flush1 = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.HEARTS),
    ];
    const flush2 = [
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.TEN, SUITS.CLUBS),
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.CLUBS),
    ];

    expectHandComparison(flush1, COMPARISON_RESULT.TIES, flush2);
});

// ============================================================================
// #region STRAIGHT
// ============================================================================

it('Broadway (Ace-high) Straight beats King-high Straight', () => {
    const broadway = [
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];
    const kingHigh = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];

    expectHandComparison(broadway, COMPARISON_RESULT.BEATS, kingHigh);
});

it('Six-high Straight beats Wheel (5-high) Straight', () => {
    const sixHigh = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.FOUR, SUITS.CLUBS),
        new Card(RANKS.FIVE, SUITS.SPADES),
        new Card(RANKS.SIX, SUITS.HEARTS),
    ];
    const wheel = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.SPADES),
        new Card(RANKS.FIVE, SUITS.HEARTS),
    ];

    expectHandComparison(sixHigh, COMPARISON_RESULT.BEATS, wheel);
});

it('Adjacent Straights: Seven-high beats Six-high', () => {
    const sevenHigh = [
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.SPADES),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
    ];
    const sixHigh = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.FOUR, SUITS.CLUBS),
        new Card(RANKS.FIVE, SUITS.SPADES),
        new Card(RANKS.SIX, SUITS.HEARTS),
    ];

    expectHandComparison(sevenHigh, COMPARISON_RESULT.BEATS, sixHigh);
});

it('Identical Straight tie', () => {
    const straight1 = [
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.TEN, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.SPADES),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
    ];
    const straight2 = [
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.NINE, SUITS.SPADES),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
    ];

    expectHandComparison(straight1, COMPARISON_RESULT.TIES, straight2);
});

// ============================================================================
// #region THREE OF A KIND
// ============================================================================

it('Aces Three of a Kind beats Kings Three of a Kind', () => {
    const aceTrips = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];
    const kingTrips = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(aceTrips, COMPARISON_RESULT.BEATS, kingTrips);
});

it('Threes Three of a Kind beats Twos Three of a Kind', () => {
    const threeTrips = [
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
    ];
    const twoTrips = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
    ];

    expectHandComparison(threeTrips, COMPARISON_RESULT.BEATS, twoTrips);
});

it('Same trips, Ace kicker beats King kicker', () => {
    const aceKicker = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const kingKicker = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(aceKicker, COMPARISON_RESULT.BEATS, kingKicker);
});

it('Same trips and first kicker, second kicker decides', () => {
    const queenSecondKicker = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];
    const jackSecondKicker = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
    ];

    expectHandComparison(queenSecondKicker, COMPARISON_RESULT.BEATS, jackSecondKicker);
});

it('Identical Three of a Kind tie', () => {
    const trips1 = [
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
        new Card(RANKS.SIX, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
    ];
    const trips2 = [
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
        new Card(RANKS.SIX, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.TEN, SUITS.SPADES),
    ];

    expectHandComparison(trips1, COMPARISON_RESULT.TIES, trips2);
});

// ============================================================================
// #region TWO PAIR
// ============================================================================

it('Aces and Kings beats Aces and Queens', () => {
    const acesKings = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
    ];
    const acesQueens = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
    ];

    expectHandComparison(acesKings, COMPARISON_RESULT.BEATS, acesQueens);
});

it('Kings and Queens beats Jacks and Tens', () => {
    const kingsQueens = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
    ];
    const jacksTens = [
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.TEN, SUITS.CLUBS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
    ];

    expectHandComparison(kingsQueens, COMPARISON_RESULT.BEATS, jacksTens);
});

it('Fours and Twos beats threes and twos', () => {
    const foursTwos = [
        new Card(RANKS.FOUR, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
    ];
    const threesTwos = [
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(threesTwos, COMPARISON_RESULT.LOSES_TO, foursTwos);
});

it('Same pairs, Ace kicker beats King kicker', () => {
    const aceKicker = [
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
    ];
    const kingKicker = [
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
    ];

    expectHandComparison(aceKicker, COMPARISON_RESULT.BEATS, kingKicker);
});

it('Identical Two Pair tie', () => {
    const twoPair1 = [
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.CLUBS),
        new Card(RANKS.FIVE, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];
    const twoPair2 = [
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.EIGHT, SUITS.SPADES),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.SPADES),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
    ];

    expectHandComparison(twoPair1, COMPARISON_RESULT.TIES, twoPair2);
});

// ============================================================================
// #region ONE PAIR
// ============================================================================

it('Aces Pair beats Kings Pair', () => {
    const acesPair = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];
    const kingsPair = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
    ];

    expectHandComparison(acesPair, COMPARISON_RESULT.BEATS, kingsPair);
});

it('Threes Pair beats Twos Pair', () => {
    const threesPair = [
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];
    const twosPair = [
        new Card(RANKS.TWO, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(threesPair, COMPARISON_RESULT.BEATS, twosPair);
});

it('Same pair, Ace kicker beats King kicker', () => {
    const aceKicker = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const kingKicker = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
    ];

    expectHandComparison(aceKicker, COMPARISON_RESULT.BEATS, kingKicker);
});

it('Same pair and first kicker, second kicker decides', () => {
    const queenSecond = [
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const tenSecond = [
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
    ];

    expectHandComparison(queenSecond, COMPARISON_RESULT.BEATS, tenSecond);
});

it('Same pair through two kickers, third kicker decides', () => {
    const eightThird = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
    ];
    const sevenThird = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
    ];

    expectHandComparison(eightThird, COMPARISON_RESULT.BEATS, sevenThird);
});

it('Identical One Pair tie', () => {
    const pair1 = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.TEN, SUITS.CLUBS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
    ];
    const pair2 = [
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.SIX, SUITS.CLUBS),
    ];

    expectHandComparison(pair1, COMPARISON_RESULT.TIES, pair2);
});

// ============================================================================
// #region HIGH CARD
// ============================================================================

it('Ace-high beats King-high', () => {
    const aceHigh = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const kingHigh = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.CLUBS),
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
    ];

    expectHandComparison(aceHigh, COMPARISON_RESULT.BEATS, kingHigh);
});

it('Same high card, second kicker decides', () => {
    const queenSecond = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const jackSecond = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.TEN, SUITS.CLUBS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
    ];

    expectHandComparison(queenSecond, COMPARISON_RESULT.BEATS, jackSecond);
});

it('Same through third kicker, fourth kicker decides', () => {
    const sevenFourth = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
    ];
    const sixFourth = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];

    expectHandComparison(sevenFourth, COMPARISON_RESULT.BEATS, sixFourth);
});

it('Decided by fifth kicker', () => {
    const fourFifth = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
    ];
    const threeFifth = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
    ];

    expectHandComparison(fourFifth, COMPARISON_RESULT.BEATS, threeFifth);
});

it('Identical High Card tie', () => {
    const highCard1 = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.CLUBS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
    ];
    const highCard2 = [
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];

    expectHandComparison(highCard1, COMPARISON_RESULT.TIES, highCard2);
});
