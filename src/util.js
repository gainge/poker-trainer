import {BASE_DECK, CARD_SET, CARD_BACK} from './constants.js';

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