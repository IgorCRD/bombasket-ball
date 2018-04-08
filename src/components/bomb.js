import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { dragStateOptions } from 'containers/bomb-container';

const BombShell = styled.div`
  width: ${props => props.radius * 2}rem;
  height: ${props => props.radius * 2}rem;
  opacity: ${props =>
    props.dragState === dragStateOptions.BEING_DRAGGED ? 0 : 1};
  z-index: ${props =>
    props.dragState === dragStateOptions.BEING_DRAGGED ? 999 : 0};

  position: absolute;
  display: ${props => (props.timer > 0 ? 'flex' : 'none')};
  justify-content: flex-end;
  align-items: flex-start;

  top: Calc(${props => props.y_pos} - ${props => props.radius}rem);
  left: Calc(${props => props.x_pos} - ${props => props.radius}rem);
  background-color: ${props => props.color};

  border-radius: 50%;
`;

const BombTimer = styled.div`
  position: relative;
  display: ${props => (props.timer > 0 ? 'flex' : 'none')};
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

export const colors = {
  red: 'rgb(209, 49, 53)',
  green: 'rgb(60, 141, 64)',
  blue: 'rgb(34, 120, 207)',
};

export default Bomb;
