import {
  INCREASE_SCORE,
  DECREASE_SCORE,
  DECREASE_TIMER,
  RESET_TIMER,
} from 'actions/game-actions';

const initialState = {
  gameScore: 0,
  changeTimer: 40,
};

const gameUiReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_SCORE:
      return { ...state, gameScore: state.gameScore + 1 };
    case DECREASE_SCORE:
      return { ...state, gameScore: state.gameScore - 1 };
    case DECREASE_TIMER:
      return { ...state, changeTimer: state.changeTimer - 1 };
    case RESET_TIMER:
      return { ...state, changeTimer: initialState.changeTimer };
    default:
      return state;
  }
};

export default gameUiReducer;
