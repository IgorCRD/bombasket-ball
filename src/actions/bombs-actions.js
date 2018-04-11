import { colors, healthPoints } from 'components/bomb';
import { randomBetween } from 'src/utils';
import uuidv4 from 'uuid/v4';

export const ADD_BOMB = 'ADD_BOMB';

const addBombAction = (x_pos, y_pos, timer, color, key) => ({
  type: ADD_BOMB,
  key,
  x_pos,
  y_pos,
  timer,
  color,
});

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
