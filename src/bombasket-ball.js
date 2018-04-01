import React from 'react';
import { injectGlobal } from 'styled-components';

import Bomb, { colors } from 'components/bomb';
import GameUi from 'components/game-ui';
import Title from 'components/title';

const BombasketBall = () => (
  <React.Fragment>
    <Title title="BombasketBall" />
    <GameUi score={100} timer={42}>
      <Bomb top="100px" left="100px" timer={7} color={colors.green} />
    </GameUi>
  </React.Fragment>
);

injectGlobal`
  body {
    padding: 0;
    margin: 0;
  }

  h1 {
    margin: 0;
  }
`;

export default BombasketBall;
