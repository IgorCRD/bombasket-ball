import { ADD_BOMB } from 'actions/bombs-field-actions';

const initialState = { bombs: [] };
const bombsFieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOMB:
      return {
        ...state,
        bombs: [
          ...state.bombs,
          {
            dragState: action.dragState,
            x_pos: action.x_pos,
            y_pos: action.y_pos,
            timer: action.timer,
            color: action.color,
          },
        ],
      };
    default:
      return state;
  }
};

export default bombsFieldReducer;
