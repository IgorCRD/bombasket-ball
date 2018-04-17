import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GameUi from 'components/game-ui';
import { decreaseTimer, resetTimer } from 'actions/game-actions';

class GameUiContainer extends React.Component {
  static propTypes = {
    score: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    changeTimer: PropTypes.number.isRequired,
    resetTimer: PropTypes.func.isRequired,
    decreaseTimer: PropTypes.func.isRequired,
  };

  descreaseChangeTimerTimeoutCallback = () => {
    const { decreaseTimer, resetTimer, changeTimer } = this.props;
    decreaseTimer();
    if (changeTimer === 0) {
      resetTimer();
    }

    this.descreaseChangeTimerTimeout = setTimeout(
      this.descreaseChangeTimerTimeoutCallback,
      1000,
    );
  };

  componentDidMount() {
    this.descreaseChangeTimerTimeout = setTimeout(
      this.descreaseChangeTimerTimeoutCallback,
      1000,
    );
  }

  render() {
    const { score, changeTimer, children } = this.props;
    return (
      <GameUi score={score} timer={changeTimer}>
        {children}
      </GameUi>
    );
  }
}

const mapStateToProps = ({ game }) => {
  return {
    score: game.gameScore,
    changeTimer: game.changeTimer,
  };
};

export default connect(mapStateToProps, { decreaseTimer, resetTimer })(
  GameUiContainer,
);
