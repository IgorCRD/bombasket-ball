import { combineReducers } from 'redux';
import bombs from 'reducers/bombs-reducer';
import game from 'reducers/game-reducer';

export default combineReducers({
  bombs,
  game,
});
