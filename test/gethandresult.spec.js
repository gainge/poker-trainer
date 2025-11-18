import {getHandResult} from '../src/util.js';
import {logCards} from '../src/log.js';
import {it, expect} from './testutil.test.js';
import {Card, Hand, RANKS, SUITS, HAND_TYPE} from '../src/model.js';
import {SIMPLE_RANK_DISPLAY, HAND_TYPE_NAMES, SUIT_SYMBOLS} from '../src/constants.js';

function expectHandResult(board, handCards, expectedHandType, expectedRank1 = undefined, expectedRank2 = undefined) {
    logCards([...board, ...handCards]);
    const hand = new Hand(handCards);
    const result = getHandResult(board, hand);

    expect(result !== undefined, 'Expected to find a hand result, but none was found.');
    expect(
        result.handType === expectedHandType,
        `Expected hand type to be [${HAND_TYPE_NAMES[expectedHandType]}], got [${HAND_TYPE_NAMES[result.handType]}].`
    );

    if (expectedRank1 !== undefined) {
        expect(
            result.rank1 === expectedRank1,
            `Expected rank1 to be ${SIMPLE_RANK_DISPLAY[expectedRank1]}, got ${SIMPLE_RANK_DISPLAY[result.rank1]}.`
        );
    }

    if (expectedRank2 !== undefined) {
        expect(
            result.rank2 === expectedRank2,
            `Expected rank2 to be ${SIMPLE_RANK_DISPLAY[expectedRank2]}, got ${SIMPLE_RANK_DISPLAY[result.rank2]}.`
        );
    }
}

// STRAIGHT FLUSH TESTS
it('should detect royal flush (straight flush with Ace high)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.TEN, SUITS.HEARTS), new Card(RANKS.THREE, SUITS.SPADES)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT_FLUSH, RANKS.ACE);
});

it('should detect wheel straight flush (A-2-3-4-5 suited)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.DIAMONDS),
        new Card(RANKS.FOUR, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.DIAMONDS), new Card(RANKS.SEVEN, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT_FLUSH, RANKS.FIVE);
});

it('should detect 9-high straight flush', () => {
    const board = [
        new Card(RANKS.NINE, SUITS.SPADES),
        new Card(RANKS.EIGHT, SUITS.SPADES),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.SIX, SUITS.SPADES),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.SPADES), new Card(RANKS.TWO, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT_FLUSH, RANKS.NINE);
});

// FOUR OF A KIND TESTS
it('should detect four Aces with King kicker', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.SPADES), new Card(RANKS.JACK, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FOUR_OF_A_KIND, RANKS.ACE, RANKS.KING);
});

it('should detect four Fives with Queen kicker', () => {
    const board = [
        new Card(RANKS.FIVE, SUITS.HEARTS),
        new Card(RANKS.FIVE, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.THREE, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.SPADES), new Card(RANKS.TWO, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FOUR_OF_A_KIND, RANKS.FIVE, RANKS.QUEEN);
});

// FULL HOUSE TESTS
it('should detect full house - Aces full of Kings', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.KING, SUITS.DIAMONDS), new Card(RANKS.JACK, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FULL_HOUSE, RANKS.ACE, RANKS.KING);
});

it('should detect full house - Sixes full of Threes', () => {
    const board = [
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.SIX, SUITS.CLUBS), new Card(RANKS.FOUR, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FULL_HOUSE, RANKS.SIX, RANKS.THREE);
});

it('should detect full house when two trips exist (choose higher trip)', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.QUEEN, SUITS.DIAMONDS), new Card(RANKS.JACK, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FULL_HOUSE, RANKS.KING, RANKS.QUEEN);
});

// FLUSH TESTS
it('should detect Ace-high flush in hearts', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.HEARTS), new Card(RANKS.THREE, SUITS.SPADES)];
    expectHandResult(board, handCards, HAND_TYPE.FLUSH, RANKS.ACE);
});

it('should detect King-high flush in diamonds', () => {
    const board = [
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.FOUR, SUITS.DIAMONDS), new Card(RANKS.THREE, SUITS.SPADES)];
    expectHandResult(board, handCards, HAND_TYPE.FLUSH, RANKS.KING);
});

// STRAIGHT TESTS
it('should detect Broadway straight (10-J-Q-K-A)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.TEN, SUITS.CLUBS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT, RANKS.ACE);
});

it('should detect wheel straight (A-2-3-4-5)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.DIAMONDS),
        new Card(RANKS.THREE, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.CLUBS), new Card(RANKS.SEVEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT, RANKS.FIVE);
});

it('should detect 9-high straight (5-6-7-8-9)', () => {
    const board = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.SPADES),
        new Card(RANKS.ACE, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.CLUBS), new Card(RANKS.TWO, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT, RANKS.NINE);
});

// THREE OF A KIND TESTS
it('should detect trip Aces', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.CLUBS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.THREE_OF_A_KIND, RANKS.ACE);
});

it('should detect trip Sevens with board cards', () => {
    const board = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.QUEEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.THREE_OF_A_KIND, RANKS.SEVEN);
});

it('should detect trip Tens using pocket pair and board card', () => {
    const board = [
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.TEN, SUITS.CLUBS), new Card(RANKS.TEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.THREE_OF_A_KIND, RANKS.TEN);
});

// TWO PAIR TESTS
it('should detect Aces and Kings (two pair)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.CLUBS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.TWO_PAIR, RANKS.ACE, RANKS.KING);
});

it('should detect Queens and Jacks (two pair)', () => {
    const board = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.SPADES),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.JACK, SUITS.HEARTS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.TWO_PAIR, RANKS.QUEEN, RANKS.JACK);
});

it('should detect two pair when three pairs exist (choose highest two)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.QUEEN, SUITS.DIAMONDS), new Card(RANKS.SEVEN, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.TWO_PAIR, RANKS.ACE, RANKS.KING);
});

// ONE PAIR TESTS
it('should detect pair of Aces', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.QUEEN, SUITS.CLUBS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.ONE_PAIR, RANKS.ACE);
});

it('should detect pocket pair (Jacks)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.FOUR, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.JACK, SUITS.CLUBS), new Card(RANKS.JACK, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.ONE_PAIR, RANKS.JACK);
});

it('should detect pair of Fours using one hole card', () => {
    const board = [
        new Card(RANKS.FOUR, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.THREE, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FOUR, SUITS.CLUBS), new Card(RANKS.ACE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.ONE_PAIR, RANKS.FOUR);
});

// HIGH CARD TESTS
it('should detect Ace-high when no other hand is made', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.CLUBS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});

it('should detect King-high when no Ace and no other hand', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.CLUBS), new Card(RANKS.THREE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.KING);
});

it('should detect Ace-high from hole card', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.FIVE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});

// PRIORITY ORDERING TESTS - ensure highest hand type is returned
it('should detect straight flush over flush when both are possible', () => {
    const board = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.HEARTS),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.HEARTS), new Card(RANKS.THREE, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT_FLUSH, RANKS.NINE);
});

it('should detect four of a kind over full house', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.ACE, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.KING, SUITS.DIAMONDS), new Card(RANKS.QUEEN, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.FOUR_OF_A_KIND, RANKS.ACE, RANKS.KING);
});

it('should detect full house over flush', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.KING, SUITS.HEARTS), new Card(RANKS.JACK, SUITS.HEARTS)];
    expectHandResult(board, handCards, HAND_TYPE.FULL_HOUSE, RANKS.ACE, RANKS.KING);
});

it('should detect flush over straight when both are possible', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.TEN, SUITS.DIAMONDS), new Card(RANKS.SEVEN, SUITS.HEARTS)];
    expectHandResult(board, handCards, HAND_TYPE.FLUSH, RANKS.ACE);
});

it('should detect straight over three of a kind', () => {
    const board = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
        new Card(RANKS.SIX, SUITS.SPADES),
        new Card(RANKS.SIX, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.SIX, SUITS.DIAMONDS), new Card(RANKS.FIVE, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT, RANKS.NINE);
});

it('should detect two pair over one pair', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.KING, SUITS.HEARTS), new Card(RANKS.QUEEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.TWO_PAIR, RANKS.ACE, RANKS.KING);
});

// 3-CARD BOARD TESTS (FLOP SCENARIOS)
it('should detect trip Aces on 3-card flop', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.QUEEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.ACE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.THREE_OF_A_KIND, RANKS.ACE);
});

it('should detect two pair on 3-card flop (pocket pair + board pair)', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.QUEEN, SUITS.CLUBS), new Card(RANKS.QUEEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.TWO_PAIR, RANKS.KING, RANKS.QUEEN);
});

it('should detect one pair on 3-card flop (flopped pair)', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.QUEEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.ONE_PAIR, RANKS.ACE);
});

it('should detect flush draw on 3-card flop (not yet a flush)', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.SEVEN, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.HEARTS), new Card(RANKS.TWO, SUITS.CLUBS)];
    // Only 4 hearts total, not enough for flush - should be Ace-high
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});

it('should detect open-ended straight draw on 3-card flop (not yet straight)', () => {
    const board = [
        new Card(RANKS.NINE, SUITS.HEARTS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.KING, SUITS.DIAMONDS)];
    // Only 3 connected cards, not a straight - should be Ace-high
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});

it('should detect pocket pair on 3-card flop (no board connection)', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.JACK, SUITS.CLUBS), new Card(RANKS.JACK, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.ONE_PAIR, RANKS.JACK);
});

it('should detect high card on 3-card flop with no made hand', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.FIVE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});

it('should detect flopped straight on 3-card board', () => {
    const board = [
        new Card(RANKS.SEVEN, SUITS.HEARTS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
        new Card(RANKS.FIVE, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.NINE, SUITS.CLUBS), new Card(RANKS.EIGHT, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT, RANKS.NINE);
});

it('should detect flopped full house on 3-card paired board', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.KING, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.CLUBS),
    ];
    const handCards = [new Card(RANKS.SEVEN, SUITS.HEARTS), new Card(RANKS.SEVEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FULL_HOUSE, RANKS.SEVEN, RANKS.KING);
});

// 4-CARD BOARD TESTS (TURN SCENARIOS)
it('should detect four of a kind on 4-card turn', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.SPADES), new Card(RANKS.QUEEN, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FOUR_OF_A_KIND, RANKS.ACE, RANKS.KING);
});

it('should detect full house on 4-card turn', () => {
    const board = [
        new Card(RANKS.QUEEN, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.JACK, SUITS.CLUBS),
        new Card(RANKS.JACK, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.QUEEN, SUITS.CLUBS), new Card(RANKS.FIVE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.FULL_HOUSE, RANKS.QUEEN, RANKS.JACK);
});

it('should detect flush on 4-card turn', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.SPADES),
        new Card(RANKS.KING, SUITS.SPADES),
        new Card(RANKS.NINE, SUITS.SPADES),
        new Card(RANKS.SEVEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.SPADES), new Card(RANKS.TWO, SUITS.HEARTS)];
    expectHandResult(board, handCards, HAND_TYPE.FLUSH, RANKS.ACE);
});

it('should detect straight on 4-card turn', () => {
    const board = [
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.JACK, SUITS.CLUBS), new Card(RANKS.TWO, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT, RANKS.JACK);
});

it('should detect three of a kind on 4-card turn', () => {
    const board = [
        new Card(RANKS.TEN, SUITS.HEARTS),
        new Card(RANKS.TEN, SUITS.DIAMONDS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.TEN, SUITS.CLUBS), new Card(RANKS.FOUR, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.THREE_OF_A_KIND, RANKS.TEN);
});

it('should detect two pair on 4-card turn', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.HEARTS),
        new Card(RANKS.ACE, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.NINE, SUITS.HEARTS), new Card(RANKS.FIVE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.TWO_PAIR, RANKS.ACE, RANKS.NINE);
});

it('should detect one pair on 4-card turn', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.QUEEN, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.KING, SUITS.CLUBS), new Card(RANKS.FIVE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.ONE_PAIR, RANKS.KING);
});

it('should detect high card on 4-card turn with no made hand', () => {
    const board = [
        new Card(RANKS.KING, SUITS.HEARTS),
        new Card(RANKS.JACK, SUITS.DIAMONDS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.SEVEN, SUITS.SPADES),
    ];
    const handCards = [new Card(RANKS.ACE, SUITS.CLUBS), new Card(RANKS.FIVE, SUITS.DIAMONDS)];
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});

it('should detect straight flush on 4-card turn', () => {
    const board = [
        new Card(RANKS.NINE, SUITS.DIAMONDS),
        new Card(RANKS.EIGHT, SUITS.DIAMONDS),
        new Card(RANKS.SEVEN, SUITS.DIAMONDS),
        new Card(RANKS.SIX, SUITS.DIAMONDS),
    ];
    const handCards = [new Card(RANKS.FIVE, SUITS.DIAMONDS), new Card(RANKS.ACE, SUITS.CLUBS)];
    expectHandResult(board, handCards, HAND_TYPE.STRAIGHT_FLUSH, RANKS.NINE);
});

it('should detect high card on 4-card turn', () => {
    const board = [
        new Card(RANKS.ACE, SUITS.CLUBS),
        new Card(RANKS.KING, SUITS.CLUBS),
        new Card(RANKS.NINE, SUITS.CLUBS),
        new Card(RANKS.TWO, SUITS.HEARTS),
    ];
    const handCards = [new Card(RANKS.QUEEN, SUITS.CLUBS), new Card(RANKS.JACK, SUITS.DIAMONDS)];
    // Only 4 clubs, not a flush yet - but we have a straight!
    expectHandResult(board, handCards, HAND_TYPE.HIGH_CARD, RANKS.ACE);
});
