import {
  INCREASE_SCORE,
  DECREASE_SCORE,
  DECREASE_TIMER,
  RESET_TIMER,
  SET_BOX_ORDER,
  RESTART,
  ADD_BOMB_COUNTER,
} from 'actions/game-actions';

const initialState = {
  gameScore: 0,
  changeTimer: 40,
  boxOrder: [0, 1, 2],
  numberOfBombsDeployed: 0,
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
    case SET_BOX_ORDER:
      return { ...state, boxOrder: action.boxOrder };
    case ADD_BOMB_COUNTER:
      return {
        ...state,
        numberOfBombsDeployed: state.numberOfBombsDeployed + 1,
      };
    case RESTART:
      return initialState;
    default:
      return state;
  }
};

export default gameUiReducer;
