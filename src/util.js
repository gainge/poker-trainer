import {BASE_DECK, CARD_SET, CARD_BACK, SIMPLE_RANK_DISPLAY, SUIT_SYMBOLS} from './constants.js';
import {
    getStraightFlushHand,
    getFourOfAKindHand,
    getFullHouseHand,
    getFlushHand,
    getStraightHand,
    getThreeOfAKindHand,
    getTwoPairHand,
    getOnePairHand,
    getHighCardHand,
} from './handeval.js';
import {SUITS} from './model.js';
import {colorize, COLOR} from './log.js';

export function getNewDeck() {
    return shuffleDeck([...BASE_DECK]);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

export function getUnicodeCard(card) {
    return CARD_SET[card.rank][card.suit] || CARD_BACK;
}

export function getSimpleCardDisplay(card) {
    return `${SIMPLE_RANK_DISPLAY[card.rank]}${SUIT_SYMBOLS[card.suit]}`;
}

export function printHand(hand) {
    return hand.map((card) => getSimpleCardDisplay(card)).join(' ');
}

export function combinations(items, k) {
    const results = [];

    /**
     * Based Gemini converting my initial recursive solution into a backtracking approach
     * Helper function to perform the recursion (backtracking)
     * @param startIndex - The index in 'items' to start considering
     * @param currentCombo - The current combination being built
     */
    function backtrack(startIndex, currentCombo) {
        if (currentCombo.length === k) {
            results.push([...currentCombo]);
            return;
        }

        if (startIndex === items.length) {
            return;
        }

        for (let i = startIndex; i < items.length; i++) {
            const currentItem = items[i];
            currentCombo.push(currentItem);
            backtrack(i + 1, currentCombo);
            currentCombo.pop();
        }
    }

    // Start the process
    backtrack(0, []);
    return results;
}

export function getHandResult(board, hand) {
    // need to construct the best had of 5 cards from the 7 available (5 board + 2 hand)
    const allCards = [...board, ...hand.getCards()];

    // Create hand data map
    // Hand data map is an object where keys are ranks and values are arrays of cards with that rank
    const handDataMap = {};
    for (const card of allCards) {
        if (!handDataMap[card.rank]) {
            handDataMap[card.rank] = [];
        }
        handDataMap[card.rank].push(card);
    }

    // Now we can progress down the hand ranking checks to determine the best hand
    const bestHand =
        getStraightFlushHand(handDataMap) ??
        getFourOfAKindHand(handDataMap) ??
        getFullHouseHand(handDataMap) ??
        getFlushHand(handDataMap) ??
        getStraightHand(handDataMap) ??
        getThreeOfAKindHand(handDataMap) ??
        getTwoPairHand(handDataMap) ??
        getOnePairHand(handDataMap) ??
        getHighCardHand(handDataMap);

    return bestHand;
}

// Can probably precompute flush and straight viabilty w/ just board cards to short-circuit some checks
export function getWinningHands(board, playerHands) {
    // Placeholder for hand ranking logic
    // This function would analyze the board and players' hands to determine the winner(s)
    return [];
}

export function evaluateHand(board, hand) {
    // Placeholder for hand evaluation logic
    // This function would return a score or rank for the given hand combined with the board
    return 0;
}

// Logs cards to console with colors denoting suits (4 color) using ANSI color codes
export function consoleLogCards(cards) {
    const getCardColor = (suit) => {
        switch (suit) {
            case SUITS.SPADES:
                return COLOR.BLACK;
            case SUITS.HEARTS:
                return COLOR.RED;
            case SUITS.DIAMONDS:
                return COLOR.BLUE;
            case SUITS.CLUBS:
                return COLOR.GREEN;
            default:
                return null;
        }
    };

    // Print Cards for display
    let logString = '--- Cards: ';
    cards.forEach((card) => {
        const fgColor = getCardColor(card.suit);
        const cardText = `${SIMPLE_RANK_DISPLAY[card.rank]}${SUIT_SYMBOLS[card.suit]}`;
        logString += colorize(` ${cardText} `, {fg: fgColor, bg: COLOR.WHITE}) + ' ';
    });

    console.log(logString.trim());
}
