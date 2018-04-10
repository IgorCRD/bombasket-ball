import { colors } from 'components/bomb';
import { randomBetween } from 'src/utils';

export const ADD_BOMB = 'ADD_BOMB';

const addBombAction = (x_pos, y_pos, timer, color) => ({
  type: ADD_BOMB,
  x_pos,
  y_pos,
  timer,
  color,
});

export const addRandomBomb = () => {
  return addBombAction(
    randomBetween(0, document.body.clientWidth + 1),
    randomBetween(0, document.body.clientHeight + 1),
    Math.floor(randomBetween(5, 11)),
    Object.values(colors)[Math.floor(randomBetween(0, 3))],
  );
};
