export const INCREASE_SCORE = 'INCREASE_SCRORE';
export const DECREASE_SCORE = 'DECREASE_SCORE';
export const DECREASE_TIMER = 'DECREASE_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export const increaseScore = () => ({ type: INCREASE_SCORE });
export const decreaseScore = () => ({ type: DECREASE_SCORE });
export const decreaseTimer = () => ({ type: DECREASE_TIMER });
export const resetTimer = () => ({ type: RESET_TIMER });
