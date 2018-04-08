import React from 'react';
import { injectGlobal } from 'styled-components';

import BombContainer from 'containers/bomb-container';
import GameUi from 'components/game-ui';
import Title from 'components/title';

class BombasketBall extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Title title="BombasketBall" />
        <GameUi score={100} timer={42}>
          <BombContainer />
        </GameUi>
      </React.Fragment>
    );
  }
}

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
