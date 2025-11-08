console.log('Poker time');

/**
 * TODO List:
 * - Implement different game modes (e.g., Pot Odds, Hand Strength)
 * - Add interactivity for selecting modes
 * - Add toggle for hand display (unicode vs simple)
 */

const random = Math.random();

// Define ranks as numeric values (2-14, where Ace is 14)
const RANKS = {
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14
};

const SUITS = {
    HEARTS: 1,
    DIAMONDS: 2,
    CLUBS: 3,
    SPADES: 4
};


// Let's actually add a more rich card display leveraging the full unicode characters
const CARD_BACK = '🂠';
const CARD_SET = {
    [RANKS.ACE]: {
        [SUITS.SPADES]: '🂡',
        [SUITS.HEARTS]: '🂱',
        [SUITS.DIAMONDS]: '🃁',
        [SUITS.CLUBS]: '🃑'
    },
    [RANKS.KING]: {
        [SUITS.SPADES]: '🂮',
        [SUITS.HEARTS]: '🂾',
        [SUITS.DIAMONDS]: '🃎',
        [SUITS.CLUBS]: '🃞'
    },
    [RANKS.QUEEN]: {
        [SUITS.SPADES]: '🂭',
        [SUITS.HEARTS]: '🂽',
        [SUITS.DIAMONDS]: '🃍',
        [SUITS.CLUBS]: '🃝'
    },
    [RANKS.JACK]: {
        [SUITS.SPADES]: '🂫',
        [SUITS.HEARTS]: '🂻',
        [SUITS.DIAMONDS]: '🃋',
        [SUITS.CLUBS]: '🃛'
    },
    [RANKS.TEN]: {
        [SUITS.SPADES]: '🂪',
        [SUITS.HEARTS]: '🂺',
        [SUITS.DIAMONDS]: '🃊',
        [SUITS.CLUBS]: '🃚'
    },
    [RANKS.NINE]: {
        [SUITS.SPADES]: '🂩',
        [SUITS.HEARTS]: '🂹',
        [SUITS.DIAMONDS]: '🃉',
        [SUITS.CLUBS]: '🃙'
    },
    [RANKS.EIGHT]: {
        [SUITS.SPADES]: '🂨',
        [SUITS.HEARTS]: '🂸',
        [SUITS.DIAMONDS]: '🃈',
        [SUITS.CLUBS]: '🃘'
    },
    [RANKS.SEVEN]: {
        [SUITS.SPADES]: '🂧',
        [SUITS.HEARTS]: '🂷',
        [SUITS.DIAMONDS]: '🃇',
        [SUITS.CLUBS]: '🃗'
    },
    [RANKS.SIX]: {
        [SUITS.SPADES]: '🂦',
        [SUITS.HEARTS]: '🂶',
        [SUITS.DIAMONDS]: '🃆',
        [SUITS.CLUBS]: '🃖'
    },
    [RANKS.FIVE]: {
        [SUITS.SPADES]: '🂥',
        [SUITS.HEARTS]: '🂵',
        [SUITS.DIAMONDS]: '🃅',
        [SUITS.CLUBS]: '🃕'
    },
    [RANKS.FOUR]: {
        [SUITS.SPADES]: '🂤',
        [SUITS.HEARTS]: '🂴',
        [SUITS.DIAMONDS]: '🃄',
        [SUITS.CLUBS]: '🃔'
    },
    [RANKS.THREE]: {
        [SUITS.SPADES]: '🂣',
        [SUITS.HEARTS]: '🂳',
        [SUITS.DIAMONDS]: '🃃',
        [SUITS.CLUBS]: '🃓'
    },
    [RANKS.TWO]: {
        [SUITS.SPADES]: '🂢',
        [SUITS.HEARTS]: '🂲',
        [SUITS.DIAMONDS]: '🃂',
        [SUITS.CLUBS]: '🃒'
    }
};

const BASE_DECK = [
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
const SIMPLE_RANK_DISPLAY = {
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
    [RANKS.ACE]: 'A'
};

const SUIT_SYMBOLS = {
    [SUITS.HEARTS]: '♥',
    [SUITS.DIAMONDS]: '♦',
    [SUITS.CLUBS]: '♣',
    [SUITS.SPADES]: '♠'
};

const SUIT_CLASS_MAP = {
    [SUITS.HEARTS]: 'hearts',
    [SUITS.DIAMONDS]: 'diamonds',
    [SUITS.CLUBS]: 'clubs',
    [SUITS.SPADES]: 'spades'
};

function getNewDeck() {
    return shuffleDeck([...BASE_DECK]);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

// Create and display cards using both numeric values and Unicode symbols
function getPlayerHandElement() {
    return document.querySelector('#player-hand');
}

function getBoardElement() {
    return document.querySelector('#board');
}

function getDisplayModeToggle() {
    return document.querySelector('#display-mode-toggle');
}

function createCard(rank, suit) {
    return { rank, suit };
}
function displayCard(card) {
    return CARD_SET[card.rank][card.suit] || CARD_BACK;
}

function buildCardElement(card) {
    // Create a span element for the card, styling depending on display mode toggle
    if (getDisplayModeToggle().checked) {
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card');
        cardSpan.textContent = displayCard(card);
        cardSpan.classList.add(SUIT_CLASS_MAP[card.suit]);
        return cardSpan;
    } else {
        const simpleSpan = document.createElement('span');
        simpleSpan.classList.add('card');
        simpleSpan.textContent = `${SIMPLE_RANK_DISPLAY[card.rank]}${SUIT_SYMBOLS[card.suit]}`;
        simpleSpan.classList.add(SUIT_CLASS_MAP[card.suit]);
        simpleSpan.classList.add('simple-card');
        return simpleSpan;
    }
}

function addCardToHand(card, handElement) {
    const cardElement = buildCardElement(card);
    handElement.appendChild(cardElement);
}

// Set up listener for card display mode toggle
getDisplayModeToggle().addEventListener('change', (event) => {
    const playerHandElement = getPlayerHandElement();
    const boardElement = getBoardElement();
    // Clear existing cards
    playerHandElement.innerHTML = '';
    boardElement.innerHTML = '';
    // Re-add cards in selected display mode
    hand.forEach(card => addCardToHand(card, playerHandElement));
    board.forEach(card => addCardToHand(card, boardElement));
});

// Set up some initial state for testing
const deck = getNewDeck();
const hand = [deck.pop(), deck.pop()];
const board = [deck.pop(), deck.pop(), deck.pop()];
const playerHandElement = getPlayerHandElement();
hand.forEach(card => addCardToHand(card, playerHandElement));
const boardElement = getBoardElement();
board.forEach(card => addCardToHand(card, boardElement));
