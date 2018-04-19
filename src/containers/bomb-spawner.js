import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BombContainer from 'containers/bomb-container';
import { addRandomBombBetween } from 'actions/bombs-actions';
import { restartGame, addBombCounter } from 'actions/game-actions';
import { calculateNextInterval, remInPixels } from 'src/utils';

class BombSpawner extends React.Component {
  static propTypes = {
    addRandomBombBetween: PropTypes.func.isRequired,
    numberOfBombsToSpawn: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    bombs: PropTypes.array.isRequired,
    numberOfBombsDeployed: PropTypes.number.isRequired,
    restartGame: PropTypes.func.isRequired,
    addBombCounter: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    numberOfBombsActive: PropTypes.number.isRequired,
  };

  addBombTimeoutCallback = () => {
    const {
      numberOfBombsToSpawn,
      addRandomBombBetween,
      numberOfBombsDeployed,
      addBombCounter,
    } = this.props;

    if (numberOfBombsDeployed >= numberOfBombsToSpawn) {
      return;
    }

    let { left, top, right, bottom } = this.bombField.getBoundingClientRect();
    const bombRadiusInPixels = remInPixels(BombContainer.bombRadius);
    left += bombRadiusInPixels;
    right -= bombRadiusInPixels;
    top += bombRadiusInPixels;
    bottom -= bombRadiusInPixels;

    addRandomBombBetween(left, right, top, bottom);
    addBombCounter();

    const time = calculateNextInterval(numberOfBombsDeployed);
    this.addBombTimeout = setTimeout(this.addBombTimeoutCallback, time);
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.numberOfBombsActive !== this.props.numberOfBombsActive ||
      nextProps.numberOfBombsDeployed !== this.props.numberOfBombsDeployed
    );
  }

  componentDidUpdate() {
    const {
      numberOfBombsDeployed,
      numberOfBombsActive,
      restartGame,
      score,
    } = this.props;
    if (numberOfBombsActive === 0 && numberOfBombsDeployed >= 120) {
      setTimeout(() => {
        /* A race condition was causing the alert to block the rendering
        * causing the game to finish while there was still one or two bombs on
        * the field.
        * setTimeout prevents it by adding the finishing routine to the event loop
        * allowing the rerender to finish its job    
        */
        alert(
          `Game finished you scored: ${score}!!!! Click ok to restart the game`,
        );
        restartGame();
      }, 2000);
    }
    if (numberOfBombsActive === 0 && numberOfBombsDeployed === 0) {
      this.addBombTimeout = setTimeout(this.addBombTimeoutCallback, 0);
    }
  }

  componentDidMount() {
    this.addBombTimeout = setTimeout(this.addBombTimeoutCallback, 0);
  }

  render() {
    const { bombs, children } = this.props;
    if (!bombs) {
      return null;
    }

    return (
      <React.Fragment>
        <div
          style={{ flexGrow: 1, width: '100%', padding: '10px' }}
          ref={ref => (this.bombField = ref)}
        >
          {bombs.map(bomb => (
            <BombContainer
              key={bomb.id}
              id={bomb.id}
              x_pos={bomb.x_pos}
              y_pos={bomb.y_pos}
              timer={bomb.timer}
              color={bomb.color}
            />
          ))}
        </div>
        {children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ bombs, game }) => ({
  bombs: Object.values(bombs.bombs),
  numberOfBombsActive: Object.keys(bombs.bombs).length,
  numberOfBombsDeployed: game.numberOfBombsDeployed,
  score: game.gameScore,
});

export default connect(mapStateToProps, {
  addRandomBombBetween,
  restartGame,
  addBombCounter,
})(BombSpawner);
