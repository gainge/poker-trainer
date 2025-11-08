console.log('Poker time');

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

// Create and display cards using both numeric values and Unicode symbols
function createCard(rank, suit) {
    return { rank, suit };
}
function displayCard(card) {
    return CARD_SET[card.rank][card.suit] || CARD_BACK;
}

function buildCardElement(card) {
    const cardSpan = document.createElement('span');
    cardSpan.classList.add('card');
    cardSpan.textContent = displayCard(card);
}

// Example usage
const card1 = createCard(RANKS.ACE, SUITS.SPADES);
const card2 = createCard(RANKS.KING, SUITS.HEARTS);
console.log('Card 1:', displayCard(card1));
console.log('Card 2:', displayCard(card2));