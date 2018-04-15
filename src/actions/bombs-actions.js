import { colors, healthPoints } from 'components/bomb';
import { randomBetween } from 'src/utils';
import uuidv4 from 'uuid/v4';

export const ADD_BOMB = 'ADD_BOMB';
export const SUBRACT_BOMB_TIMER = 'SUBRACT_BOMB_TIMER';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const DELETE_BOMB = 'DELETE_BOMB';

const addBombAction = (x_pos, y_pos, timer, color, id) => ({
  type: ADD_BOMB,
  id,
  x_pos,
  y_pos,
  timer,
  color,
});

export const subtractBombTimerByOne = id => {
  return {
    type: SUBRACT_BOMB_TIMER,
    id,
  };
};

export const updatePosition = (id, x, y) => {
  return {
    type: UPDATE_POSITION,
    id,
    x,
    y,
  };
};

export const deleteBomb = id => {
  return {
    type: DELETE_BOMB,
    id,
  };
};

export const addRandomBombBetween = (x_min, x_max, y_min, y_max) => {
  return addBombAction(
    randomBetween(x_min, x_max + 1),
    randomBetween(y_min, y_max + 1),
    Math.floor(randomBetween(healthPoints.minHp, healthPoints.maxHp + 1)),
    Object.values(colors)[
      Math.floor(randomBetween(0, Object.values(colors).length))
    ],
    uuidv4(),
  );
};
