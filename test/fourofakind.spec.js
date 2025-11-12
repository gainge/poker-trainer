import {getFourOfAKindHand} from '../src/handeval.js';
import {it, expect} from './testutil.test.js';
import {RANKS, SUITS, HAND_TYPE} from '../src/model.js';

it('should detect four of a kind', () => {
    const handDataMap = {
        [RANKS.NINE]: [
            {rank: RANKS.NINE, suit: SUITS.HEARTS},
            {rank: RANKS.NINE, suit: SUITS.DIAMONDS},
            {rank: RANKS.NINE, suit: SUITS.CLUBS},
            {rank: RANKS.NINE, suit: SUITS.SPADES},
        ],
        [RANKS.THREE]: [{rank: RANKS.THREE, suit: SUITS.HEARTS}],
    };
    const result = getFourOfAKindHand(handDataMap);
    expect(result !== undefined, 'Expected to find four of a kind, but none was found.');
    expect(result.handType === HAND_TYPE.FOUR_OF_A_KIND, 'Expected hand type to be FOUR_OF_A_KIND.');
    expect(result.rank1 === RANKS.NINE, `Expected four of a kind to be NINEs.`);
});
