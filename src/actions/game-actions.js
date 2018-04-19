export const INCREASE_SCORE = 'INCREASE_SCRORE';
export const DECREASE_SCORE = 'DECREASE_SCORE';
export const DECREASE_TIMER = 'DECREASE_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const SET_BOX_ORDER = 'SET_BOX_ORDER';
export const RESTART = 'RESTART';
export const ADD_BOMB_COUNTER = 'ADD_BOMB_COUNTER';

export const increaseScore = () => ({ type: INCREASE_SCORE });
export const decreaseScore = () => ({ type: DECREASE_SCORE });
export const decreaseTimer = () => ({ type: DECREASE_TIMER });
export const resetTimer = () => ({ type: RESET_TIMER });
export const setBoxOrder = boxOrder => ({ type: SET_BOX_ORDER, boxOrder });
export const restartGame = () => ({ type: RESTART });
export const addBombCounter = () => ({ type: ADD_BOMB_COUNTER });
