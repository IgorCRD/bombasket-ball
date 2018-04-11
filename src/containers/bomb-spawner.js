import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BombContainer from 'containers/bomb-container';
import { addRandomBombBetween } from 'actions/bombs-actions';
import { calculateNextInterval } from 'src/utils';

class BombSpawner extends React.Component {
  static propTypes = {
    addRandomBombBetween: PropTypes.func.isRequired,
    numberOfBombsToSpawn: PropTypes.number.isRequired,
    bombs: PropTypes.array.isRequired,
  };

  state = {
    numberOfBombsDeployed: 0,
  };

  componentDidMount() {
    const { addRandomBombBetween, numberOfBombsToSpawn } = this.props;

    const timeOutCallback = () => {
      const { numberOfBombsDeployed } = this.state;
      if (numberOfBombsDeployed >= numberOfBombsToSpawn) {
        return;
      }

      addRandomBombBetween(
        0,
        document.body.clientWidth,
        0,
        document.body.clientHeight,
      );
      this.setState(prevState => ({
        numberOfBombsDeployed: prevState.numberOfBombsDeployed + 1,
      }));

      const time = calculateNextInterval(numberOfBombsDeployed);
      this.addBombTimeout = setTimeout(timeOutCallback, time);
    };

    this.addBombTimeout = setTimeout(timeOutCallback);
  }

  render() {
    const { bombs } = this.props;
    if (!bombs) {
      return null;
    }

    return (
      <React.Fragment>
        {bombs.map(bomb => (
          <BombContainer
            key={bomb.key}
            x_pos={bomb.x_pos}
            y_pos={bomb.y_pos}
            timer={bomb.timer}
            color={bomb.color}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ bombs }) => ({
  bombs: Object.values(bombs.bombs),
});

export default connect(mapStateToProps, { addRandomBombBetween })(BombSpawner);
