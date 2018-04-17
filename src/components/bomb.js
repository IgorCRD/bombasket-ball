import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { dragStateOptions } from 'containers/bomb-container';

// using attrs on dynamic rules to avoid excessive css class generation
const BombShell = styled.div.attrs({
  style: props => ({
    width: `${props.radius * 2}rem`,
    height: `${props.radius * 2}rem`,
    opacity: props.dragState === dragStateOptions.BEING_DRAGGED ? 0 : 1,
    zIndex: props.dragState === dragStateOptions.BEING_DRAGGED ? 999 : 0,
    top: `Calc(${props.y_pos} - ${props.radius}rem)`,
    backgroundColor: `${props.color}`,
    left: `Calc(${props.x_pos} - ${props.radius}rem)`,
    display: `${props.timer > 0 ? 'flex' : 'none'}`,
  }),
})`
  position: absolute;
  justify-content: flex-end;
  align-items: flex-start;

  border-radius: 50%;
`;

const BombTimer = styled.div.attrs({
  style: props => ({
    display: `${props.timer > 0 ? 'flex' : 'none'}`,
  }),
})`
  position: relative;
  justify-content: center;
  align-items: center;

  background-color: rgb(253, 166, 57);

  font-size: 11px;
  font-family: sans-serif;

  width: 0.3rem;
  height: 0.3rem;
  padding: 0.6rem;
  border-radius: 50%;
`;

const Bomb = ({
  x_pos,
  y_pos,
  radius,
  timer,
  color,
  dragState,
  onDrag,
  onDragStart,
  onDragEnd,
}) => (
  <BombShell
    draggable="true"
    radius={radius}
    x_pos={x_pos}
    y_pos={y_pos}
    timer={timer}
    color={color}
    onDrag={onDrag}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    dragState={dragState}
  >
    <BombTimer timer={timer}>{timer}</BombTimer>
  </BombShell>
);

Bomb.propTypes = {
  x_pos: PropTypes.string.isRequired,
  y_pos: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  dragState: PropTypes.string.isRequired,
};

export const healthPoints = {
  minHp: 5,
  maxHp: 10,
};

export default Bomb;
