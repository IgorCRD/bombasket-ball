import React from 'react';
import Bomb, { colors } from 'components/bomb';

// top: PropTypes.number.isRequired,
// left: PropTypes.number.isRequired,
// timer: PropTypes.number.isRequired,
// color: PropTypes.string.isRequired,

const BombasketBall = () => (
  <div>
    <h1>BombasketBall</h1>
    <Bomb top="100px" left="100px" timer={7} color={colors.green} />
  </div>
);

export default BombasketBall;
