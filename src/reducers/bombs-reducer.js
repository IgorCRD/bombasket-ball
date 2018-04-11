import { ADD_BOMB } from 'actions/bombs-actions';

const initialState = { bombs: {} };

const insertBomb = (bombsMap, newBomb) => {
  const resBombsMap = { ...bombsMap };
  resBombsMap[newBomb.key] = {
    ...newBomb,
  };
  return resBombsMap;
};

const bombsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOMB:
      return {
        ...state,
        bombs: insertBomb(state.bombs, {
          key: action.key,
          x_pos: action.x_pos,
          y_pos: action.y_pos,
          timer: action.timer,
          color: action.color,
        }),
      };
    default:
      return state;
  }
};

export default bombsReducer;
