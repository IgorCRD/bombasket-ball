import {
  ADD_BOMB,
  DECREASE_BOMB_TIMER,
  UPDATE_POSITION,
  DELETE_BOMB,
  ZERO_BOMB_TIMER,
} from 'actions/bombs-actions';
import { RESTART } from 'actions/game-actions';

const insertBomb = (bombsMap, newBomb) => {
  const resBombsMap = { ...bombsMap };
  resBombsMap[newBomb.id] = {
    ...newBomb,
  };
  return resBombsMap;
};

const decreaseBombTimer = (bombs, id) => {
  const bombToDecreaseTimer = bombs[id];

  const bombsResult = {
    ...bombs,
  };

  if (bombToDecreaseTimer) {
    bombsResult[id] = {
      ...bombToDecreaseTimer,
      timer: bombToDecreaseTimer.timer - 1,
    };
  }

  return bombsResult;
};

const deleteBomb = (bombs, id) => {
  const { [id]: deletedBomb, ...newBombs } = bombs;
  return newBombs;
};

const updateBombPosition = (bombs, id, x, y) => {
  const bombToUpdate = bombs[id];
  const bombsResult = {
    ...bombs,
  };
  bombsResult[id] = { ...bombToUpdate, x_pos: x, y_pos: y };
  return bombsResult;
};

const zeroBombTimer = (bombs, id) => {
  const bombToZeroTimer = bombs[id];

  const bombsResult = {
    ...bombs,
  };

  if (bombToZeroTimer) {
    bombsResult[id] = {
      ...bombToZeroTimer,
      timer: 0,
    };
  }
  return bombsResult;
};

const initialState = { bombs: {} };

const bombsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOMB:
      return {
        ...state,
        bombs: insertBomb(state.bombs, {
          id: action.id,
          x_pos: action.x_pos,
          y_pos: action.y_pos,
          timer: action.timer,
          color: action.color,
        }),
      };
    case DECREASE_BOMB_TIMER:
      return {
        ...state,
        bombs: decreaseBombTimer(state.bombs, action.id),
      };
    case UPDATE_POSITION:
      return {
        ...state,
        bombs: updateBombPosition(state.bombs, action.id, action.x, action.y),
      };
    case DELETE_BOMB:
      return {
        ...state,
        bombs: deleteBomb(state.bombs, action.id),
      };
    case ZERO_BOMB_TIMER:
      return {
        ...state,
        bombs: zeroBombTimer(state.bombs, action.id),
      };
    case RESTART:
      return initialState;
    default:
      return state;
  }
};

export default bombsReducer;
