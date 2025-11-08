import {getNewDeck, getUnicodeCard} from './util.js';
import {getDisplayModeToggle, getPlayerHandElement, getBoardElement} from './globalDOM.js';
import {SIMPLE_RANK_DISPLAY, SUIT_SYMBOLS, SUIT_CLASS_MAP} from './constants.js';

console.log('Poker time');

/**
 * TODO List:
 * - Implement different game modes (e.g., Pot Odds, Hand Strength)
 *  - Pot odds
 *  - Outs
 *  - Fold equity
 * - Add interactivity for selecting modes
 * - Add toggle for hand display (unicode vs simple)
 */

function buildCardElement(card) {
    // Create a span element for the card, styling depending on display mode toggle
    if (getDisplayModeToggle().checked) {
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('card');
        cardSpan.textContent = getUnicodeCard(card);
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
