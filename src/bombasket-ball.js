import React from 'react';
import { injectGlobal } from 'styled-components';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import BombSpawner from 'containers/bomb-spawner';
import GameUiContainer from 'containers/game-ui-container';
import Title from 'components/title';
import BombBoxChanger from 'containers/bomb-box-changer';
import reducers from 'reducers';

/* eslint-disable no-console */
const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};
/* eslint-enable no-console */

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(logger)),
);

class BombasketBall extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Title title="BombasketBall" />
          <GameUiContainer>
            <BombSpawner numberOfBombsToSpawn={120}>
              <BombBoxChanger />
            </BombSpawner>
          </GameUiContainer>
        </React.Fragment>
      </Provider>
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
