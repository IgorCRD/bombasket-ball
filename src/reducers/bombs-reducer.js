import {
  ADD_BOMB,
  SUBRACT_BOMB_TIMER,
  UPDATE_POSITION,
} from 'actions/bombs-actions';

const initialState = { bombs: {} };

const insertBomb = (bombsMap, newBomb) => {
  const resBombsMap = { ...bombsMap };
  resBombsMap[newBomb.id] = {
    ...newBomb,
  };
  return resBombsMap;
};

const subtractBombTimer = (bombs, id) => {
  const bombToSubtract = bombs[id];
  const bombsResult = {
    ...bombs,
  };
  bombsResult[id] = { ...bombToSubtract, timer: bombToSubtract.timer - 1 };
  return bombsResult;
};

const updateBombPosition = (bombs, id, x, y) => {
  const bombToUpdate = bombs[id];
  const bombsResult = {
    ...bombs,
  };
  bombsResult[id] = { ...bombToUpdate, x_pos: x, y_pos: y };
  return bombsResult;
};

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
    case SUBRACT_BOMB_TIMER:
      return {
        ...state,
        bombs: subtractBombTimer(state.bombs, action.id),
      };
    case UPDATE_POSITION:
      return {
        ...state,
        bombs: updateBombPosition(state.bombs, action.id, action.x, action.y),
      };
    default:
      return state;
  }
};

export default bombsReducer;
