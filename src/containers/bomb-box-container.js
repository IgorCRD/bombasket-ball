import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BombBox from 'components/bomb-box';
import { increaseScore, decreaseScore } from 'actions/game-actions';
import { zeroBombTimer } from 'actions/bombs-actions';

class BombBoxContainer extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    colorShade: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    bombs: PropTypes.object.isRequired,
    decreaseScore: PropTypes.func.isRequired,
    increaseScore: PropTypes.func.isRequired,
    zeroBombTimer: PropTypes.func.isRequired,
  };

  state = {
    over: false,
  };

  onDropCallback = event => {
    event.stopPropagation();
    event.preventDefault();

    const {
      bombs,
      color,
      increaseScore,
      decreaseScore,
      zeroBombTimer,
    } = this.props;
    const droppedBombId = event.dataTransfer.getData('text/plain');
    const droppedBomb = bombs[droppedBombId];

    if (droppedBomb) {
      if (droppedBomb.color === color) {
        increaseScore();
      } else {
        decreaseScore();
      }
      zeroBombTimer(droppedBomb.id);
    }

    this.setState(() => ({
      over: false,
    }));

    return false;
  };

  onDragEnterCallback = event => {
    event.stopPropagation();
    event.preventDefault();

    this.setState(() => ({
      over: true,
    }));

    return false;
  };

  onDragLeaveCallback = event => {
    event.stopPropagation();
    event.preventDefault();

    this.setState(() => ({
      over: false,
    }));

    return false;
  };

  render() {
    const { color, order, colorShade } = this.props;
    const { over } = this.state;
    return (
      <BombBox
        onDrop={this.onDropCallback}
        onDragEnter={this.onDragEnterCallback}
        onDragLeave={this.onDragLeaveCallback}
        color={color}
        colorShade={colorShade}
        order={order}
        over={over}
      />
    );
  }
}

const mapStateToProps = ({ bombs }) => {
  return {
    bombs: bombs.bombs,
  };
};

export default connect(mapStateToProps, {
  increaseScore,
  decreaseScore,
  zeroBombTimer,
})(BombBoxContainer);
