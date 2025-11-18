import {RANKS, SUITS, HAND_TYPE} from './types.js';

// Let's actually add a more rich card display leveraging the full unicode characters
export const CARD_BACK = '🂠';
export const CARD_SET = {
    [RANKS.ACE]: {
        [SUITS.SPADES]: '🂡',
        [SUITS.HEARTS]: '🂱',
        [SUITS.DIAMONDS]: '🃁',
        [SUITS.CLUBS]: '🃑',
    },
    [RANKS.KING]: {
        [SUITS.SPADES]: '🂮',
        [SUITS.HEARTS]: '🂾',
        [SUITS.DIAMONDS]: '🃎',
        [SUITS.CLUBS]: '🃞',
    },
    [RANKS.QUEEN]: {
        [SUITS.SPADES]: '🂭',
        [SUITS.HEARTS]: '🂽',
        [SUITS.DIAMONDS]: '🃍',
        [SUITS.CLUBS]: '🃝',
    },
    [RANKS.JACK]: {
        [SUITS.SPADES]: '🂫',
        [SUITS.HEARTS]: '🂻',
        [SUITS.DIAMONDS]: '🃋',
        [SUITS.CLUBS]: '🃛',
    },
    [RANKS.TEN]: {
        [SUITS.SPADES]: '🂪',
        [SUITS.HEARTS]: '🂺',
        [SUITS.DIAMONDS]: '🃊',
        [SUITS.CLUBS]: '🃚',
    },
    [RANKS.NINE]: {
        [SUITS.SPADES]: '🂩',
        [SUITS.HEARTS]: '🂹',
        [SUITS.DIAMONDS]: '🃉',
        [SUITS.CLUBS]: '🃙',
    },
    [RANKS.EIGHT]: {
        [SUITS.SPADES]: '🂨',
        [SUITS.HEARTS]: '🂸',
        [SUITS.DIAMONDS]: '🃈',
        [SUITS.CLUBS]: '🃘',
    },
    [RANKS.SEVEN]: {
        [SUITS.SPADES]: '🂧',
        [SUITS.HEARTS]: '🂷',
        [SUITS.DIAMONDS]: '🃇',
        [SUITS.CLUBS]: '🃗',
    },
    [RANKS.SIX]: {
        [SUITS.SPADES]: '🂦',
        [SUITS.HEARTS]: '🂶',
        [SUITS.DIAMONDS]: '🃆',
        [SUITS.CLUBS]: '🃖',
    },
    [RANKS.FIVE]: {
        [SUITS.SPADES]: '🂥',
        [SUITS.HEARTS]: '🂵',
        [SUITS.DIAMONDS]: '🃅',
        [SUITS.CLUBS]: '🃕',
    },
    [RANKS.FOUR]: {
        [SUITS.SPADES]: '🂤',
        [SUITS.HEARTS]: '🂴',
        [SUITS.DIAMONDS]: '🃄',
        [SUITS.CLUBS]: '🃔',
    },
    [RANKS.THREE]: {
        [SUITS.SPADES]: '🂣',
        [SUITS.HEARTS]: '🂳',
        [SUITS.DIAMONDS]: '🃃',
        [SUITS.CLUBS]: '🃓',
    },
    [RANKS.TWO]: {
        [SUITS.SPADES]: '🂢',
        [SUITS.HEARTS]: '🂲',
        [SUITS.DIAMONDS]: '🃂',
        [SUITS.CLUBS]: '🃒',
    },
};

export const BASE_DECK = [
    // Aces
    {rank: RANKS.ACE, suit: SUITS.SPADES},
    {rank: RANKS.ACE, suit: SUITS.HEARTS},
    {rank: RANKS.ACE, suit: SUITS.DIAMONDS},
    {rank: RANKS.ACE, suit: SUITS.CLUBS},
    // Kings
    {rank: RANKS.KING, suit: SUITS.SPADES},
    {rank: RANKS.KING, suit: SUITS.HEARTS},
    {rank: RANKS.KING, suit: SUITS.DIAMONDS},
    {rank: RANKS.KING, suit: SUITS.CLUBS},
    // Queens
    {rank: RANKS.QUEEN, suit: SUITS.SPADES},
    {rank: RANKS.QUEEN, suit: SUITS.HEARTS},
    {rank: RANKS.QUEEN, suit: SUITS.DIAMONDS},
    {rank: RANKS.QUEEN, suit: SUITS.CLUBS},
    // Jacks
    {rank: RANKS.JACK, suit: SUITS.SPADES},
    {rank: RANKS.JACK, suit: SUITS.HEARTS},
    {rank: RANKS.JACK, suit: SUITS.DIAMONDS},
    {rank: RANKS.JACK, suit: SUITS.CLUBS},
    // Tens
    {rank: RANKS.TEN, suit: SUITS.SPADES},
    {rank: RANKS.TEN, suit: SUITS.HEARTS},
    {rank: RANKS.TEN, suit: SUITS.DIAMONDS},
    {rank: RANKS.TEN, suit: SUITS.CLUBS},
    // Nines
    {rank: RANKS.NINE, suit: SUITS.SPADES},
    {rank: RANKS.NINE, suit: SUITS.HEARTS},
    {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
    {rank: RANKS.NINE, suit: SUITS.CLUBS},
    // Eights
    {rank: RANKS.EIGHT, suit: SUITS.SPADES},
    {rank: RANKS.EIGHT, suit: SUITS.HEARTS},
    {rank: RANKS.EIGHT, suit: SUITS.DIAMONDS},
    {rank: RANKS.EIGHT, suit: SUITS.CLUBS},
    // Sevens
    {rank: RANKS.SEVEN, suit: SUITS.SPADES},
    {rank: RANKS.SEVEN, suit: SUITS.HEARTS},
    {rank: RANKS.SEVEN, suit: SUITS.DIAMONDS},
    {rank: RANKS.SEVEN, suit: SUITS.CLUBS},
    // Sixes
    {rank: RANKS.SIX, suit: SUITS.SPADES},
    {rank: RANKS.SIX, suit: SUITS.HEARTS},
    {rank: RANKS.SIX, suit: SUITS.DIAMONDS},
    {rank: RANKS.SIX, suit: SUITS.CLUBS},
    // Fives
    {rank: RANKS.FIVE, suit: SUITS.SPADES},
    {rank: RANKS.FIVE, suit: SUITS.HEARTS},
    {rank: RANKS.FIVE, suit: SUITS.DIAMONDS},
    {rank: RANKS.FIVE, suit: SUITS.CLUBS},
    // Fours
    {rank: RANKS.FOUR, suit: SUITS.SPADES},
    {rank: RANKS.FOUR, suit: SUITS.HEARTS},
    {rank: RANKS.FOUR, suit: SUITS.DIAMONDS},
    {rank: RANKS.FOUR, suit: SUITS.CLUBS},
    // Threes
    {rank: RANKS.THREE, suit: SUITS.SPADES},
    {rank: RANKS.THREE, suit: SUITS.HEARTS},
    {rank: RANKS.THREE, suit: SUITS.DIAMONDS},
    {rank: RANKS.THREE, suit: SUITS.CLUBS},
    // Twos
    {rank: RANKS.TWO, suit: SUITS.SPADES},
    {rank: RANKS.TWO, suit: SUITS.HEARTS},
    {rank: RANKS.TWO, suit: SUITS.DIAMONDS},
    {rank: RANKS.TWO, suit: SUITS.CLUBS},
];

// Map numeric ranks to display values
export const SIMPLE_RANK_DISPLAY = {
    [RANKS.TWO]: '2',
    [RANKS.THREE]: '3',
    [RANKS.FOUR]: '4',
    [RANKS.FIVE]: '5',
    [RANKS.SIX]: '6',
    [RANKS.SEVEN]: '7',
    [RANKS.EIGHT]: '8',
    [RANKS.NINE]: '9',
    [RANKS.TEN]: '10',
    [RANKS.JACK]: 'J',
    [RANKS.QUEEN]: 'Q',
    [RANKS.KING]: 'K',
    [RANKS.ACE]: 'A',
};

export const SUIT_SYMBOLS = {
    [SUITS.HEARTS]: '♥',
    [SUITS.DIAMONDS]: '♦',
    [SUITS.CLUBS]: '♣',
    [SUITS.SPADES]: '♠',
};

export const SUIT_CLASS_MAP = {
    [SUITS.HEARTS]: 'hearts',
    [SUITS.DIAMONDS]: 'diamonds',
    [SUITS.CLUBS]: 'clubs',
    [SUITS.SPADES]: 'spades',
};

export const HAND_TYPE_NAMES = {
    [HAND_TYPE.HIGH_CARD]: 'High Card',
    [HAND_TYPE.ONE_PAIR]: 'Pair',
    [HAND_TYPE.TWO_PAIR]: 'Two Pair',
    [HAND_TYPE.THREE_OF_A_KIND]: 'Three of a Kind',
    [HAND_TYPE.STRAIGHT]: 'Straight',
    [HAND_TYPE.FLUSH]: 'Flush',
    [HAND_TYPE.FULL_HOUSE]: 'Full House',
    [HAND_TYPE.FOUR_OF_A_KIND]: 'Four of a Kind',
    [HAND_TYPE.STRAIGHT_FLUSH]: 'Straight Flush',
};

export const RANKS_DESCENDING = [
    RANKS.ACE,
    RANKS.KING,
    RANKS.QUEEN,
    RANKS.JACK,
    RANKS.TEN,
    RANKS.NINE,
    RANKS.EIGHT,
    RANKS.SEVEN,
    RANKS.SIX,
    RANKS.FIVE,
    RANKS.FOUR,
    RANKS.THREE,
    RANKS.TWO,
];
