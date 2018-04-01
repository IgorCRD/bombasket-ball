import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BombShell = styled.div`
  position: absolute;
  display: ${props => (props.timer > 0 ? 'flex' : 'none')};
  justify-content: flex-end;
  align-items: flex-start;

  top: ${props => props.top};
  left: ${props => props.left};
  background-color: ${props => props.color};

  border-radius: 50%;
  width: 4em;
  height: 4em;
`;

const BombTimer = styled.div`
  position: relative;
  display: ${props => (props.timer > 0 ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  background-color: rgb(253, 166, 57);

  font-size: 11px;
  font-family: sans-serif;

  width: 1em;
  height: 1em;
  padding: 0.6em;
  border-radius: 50%;
`;

const Bomb = ({ top, left, timer, color }) => (
  <BombShell top={top} left={left} timer={timer} color={color}>
    <BombTimer timer={timer}>{timer}</BombTimer>
  </BombShell>
);

Bomb.propTypes = {
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export const colors = {
  red: 'rgb(209, 49, 53)',
  green: 'rgb(60, 141, 64)',
  blue: 'rgb(34, 120, 207)',
};

export default Bomb;
