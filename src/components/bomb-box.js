import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const scaleOnOver = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
`;

const BombBoxStyled = styled.div.attrs({
  style: props => ({
    backgroundColor: props.over ? props.colorShade : props.color,
    order: props.order,
    animation: props.over ? `${scaleOnOver} 0.2s linear` : 'none',
    animationFillMode: props.over ? 'forwards' : 'backwards',
  }),
})`
  max-height: 100%;
  width: 20%;
`;

const BombBox = ({
  color,
  colorShade,
  order,
  over,
  onDrop,
  onDragOver,
  onDragEnter,
  onDragLeave,
}) => (
  <BombBoxStyled
    color={color}
    colorShade={colorShade}
    order={order}
    over={over}
    onDrop={onDrop}
    onDragOver={onDragOver}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
  />
);

BombBox.propTypes = {
  color: PropTypes.string.isRequired,
  colorShade: PropTypes.string.isRequired,
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  order: PropTypes.number.isRequired,
  over: PropTypes.bool.isRequired,
};

BombBox.defaultProps = {
  onDrop: e => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  },
  onDragOver: e => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  },
  onDragEnter: e => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  },
  onDragLeave: e => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  },
};

export default BombBox;
