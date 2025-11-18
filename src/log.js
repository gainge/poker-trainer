import {SUITS} from './model.js';
import {SIMPLE_RANK_DISPLAY, SUIT_SYMBOLS} from './constants.js';

/**
 * ANSI color utilities for terminal output
 * Provides consistent coloring across the codebase
 */

const FOREGROUND = 'FG_';
const BACKGROUND = 'BG_';

// Color constants - use these as parameters to colorize()
export const COLOR = {
    BLACK: 'BLACK',
    RED: 'RED',
    GREEN: 'GREEN',
    YELLOW: 'YELLOW',
    BLUE: 'BLUE',
    MAGENTA: 'MAGENTA',
    CYAN: 'CYAN',
    WHITE: 'WHITE',
};

// ANSI color codes mapped by color constants
const ANSI = {
    RESET: '\x1b[0m',
    // Foreground colors
    [`${FOREGROUND}${COLOR.BLACK}`]: '\x1b[30m',
    [`${FOREGROUND}${COLOR.RED}`]: '\x1b[31m',
    [`${FOREGROUND}${COLOR.GREEN}`]: '\x1b[32m',
    [`${FOREGROUND}${COLOR.YELLOW}`]: '\x1b[33m',
    [`${FOREGROUND}${COLOR.BLUE}`]: '\x1b[34m',
    [`${FOREGROUND}${COLOR.MAGENTA}`]: '\x1b[35m',
    [`${FOREGROUND}${COLOR.CYAN}`]: '\x1b[36m',
    [`${FOREGROUND}${COLOR.WHITE}`]: '\x1b[37m',
    // Background colors
    [`${BACKGROUND}${COLOR.BLACK}`]: '\x1b[40m',
    [`${BACKGROUND}${COLOR.RED}`]: '\x1b[41m',
    [`${BACKGROUND}${COLOR.GREEN}`]: '\x1b[42m',
    [`${BACKGROUND}${COLOR.YELLOW}`]: '\x1b[43m',
    [`${BACKGROUND}${COLOR.BLUE}`]: '\x1b[44m',
    [`${BACKGROUND}${COLOR.MAGENTA}`]: '\x1b[45m',
    [`${BACKGROUND}${COLOR.CYAN}`]: '\x1b[46m',
    [`${BACKGROUND}${COLOR.WHITE}`]: '\x1b[47m',
};

/**
 * Simple color wrapper functions
 * These match the pattern from test/testutil.test.js
 */

export function asRed(message) {
    return `${ANSI[`${FOREGROUND}${COLOR.RED}`]}${message}${ANSI.RESET}`;
}

export function asGreen(message) {
    return `${ANSI[`${FOREGROUND}${COLOR.GREEN}`]}${message}${ANSI.RESET}`;
}

export function asYellow(message) {
    return `${ANSI[`${FOREGROUND}${COLOR.YELLOW}`]}${message}${ANSI.RESET}`;
}

export function asBlue(message) {
    return `${ANSI[`${FOREGROUND}${COLOR.BLUE}`]}${message}${ANSI.RESET}`;
}

export function asMagenta(message) {
    return `${ANSI[`${FOREGROUND}${COLOR.MAGENTA}`]}${message}${ANSI.RESET}`;
}

export function asCyan(message) {
    return `${ANSI[`${FOREGROUND}${COLOR.CYAN}`]}${message}${ANSI.RESET}`;
}

/**
 * Flexible styling function for complex use cases
 * Supports both foreground and background colors
 *
 * @param {string} text - The text to colorize
 * @param {Object} options - Styling options
 * @param {string} [options.fg] - Foreground color constant (e.g., COLOR.RED, COLOR.GREEN)
 * @param {string} [options.bg] - Background color constant (e.g., COLOR.WHITE, COLOR.BLACK)
 * @returns {string} The colorized text with ANSI codes
 */
export function colorize(text, {fg, bg} = {}) {
    let result = '';

    // Apply background color if specified
    if (bg) {
        const bgKey = `${BACKGROUND}${bg}`;
        if (ANSI[bgKey]) {
            result += ANSI[bgKey];
        }
    }

    // Apply foreground color if specified
    if (fg) {
        const fgKey = `${FOREGROUND}${fg}`;
        if (ANSI[fgKey]) {
            result += ANSI[fgKey];
        }
    }

    result += text;
    result += ANSI.RESET;

    return result;
}

export function getCardLogString(card) {
    const suitColors = {
        [SUITS.HEARTS]: COLOR.RED,
        [SUITS.DIAMONDS]: COLOR.BLUE,
        [SUITS.CLUBS]: COLOR.GREEN,
        [SUITS.SPADES]: COLOR.BLACK,
    };

    const cardText = `${SIMPLE_RANK_DISPLAY[card.rank]}${SUIT_SYMBOLS[card.suit]}`;
    return colorize(` ${cardText} `, {fg: suitColors[card.suit], bg: COLOR.WHITE});
}

// Logs cards to console with colors denoting suits (4 color) using ANSI color codes
export function logCards(cards) {
    // Print Cards for display
    let logString = '--- Cards: ';
    cards.forEach((card) => {
        logString += getCardLogString(card) + ' ';
    });

    console.log(logString.trim());
}
