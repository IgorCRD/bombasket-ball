import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Bomb from 'components/bomb';
import { remInPixels } from 'src/utils';
import {
  decreaseBombTimer,
  updatePosition,
  deleteBomb,
} from 'actions/bombs-actions';
import { decreaseScore } from 'actions/game-actions';

export const dragStateOptions = {
  INACTIVE: 'INACTIVE',
  BEING_DRAGGED: 'BEING_DRAGGED',
};

class BombContainer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    x_pos: PropTypes.number.isRequired,
    y_pos: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    deleteBomb: PropTypes.func.isRequired,
    decreaseScore: PropTypes.func.isRequired,
    setNewPosition: PropTypes.func.isRequired,
    decreaseBombTimer: PropTypes.func.isRequired,
  };

  static bombRadius = 2;

  static getContainerLimitedCoordinates = (
    x,
    y,
    xPadding,
    yPadding,
    container,
  ) => {
    let [x_res, y_res] = [x, y];
    if (x_res < xPadding) x_res = xPadding;
    if (y_res < yPadding) y_res = yPadding;
    if (Math.abs(x_res - container.clientWidth) < xPadding)
      x_res = container.clientWidth - xPadding;
    if (Math.abs(y_res - container.clientHeight) < yPadding)
      y_res = container.clientHeight - yPadding;

    return { x: x_res, y: y_res };
  };

  state = {
    dragState: dragStateOptions.INACTIVE,
  };

  onDragStartHandler = event => {
    const { id } = this.props;

    this.setState(() => ({
      dragState: dragStateOptions.BEING_DRAGGED,
    }));

    this.shadow = (event.target || event.srcElement).cloneNode(true);
    this.shadow.style['pointer-events'] = 'none';
    document.body.appendChild(this.shadow);

    event.stopPropagation();
    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.setData('Text', id);
  };

  onDragHandler = event => {
    if (event.clientX === 0 && event.clientY === 0) return;

    const twoRemInPixels = remInPixels(BombContainer.bombRadius);
    //browser window limits
    let { x, y } = BombContainer.getContainerLimitedCoordinates(
      event.clientX,
      event.clientY,
      twoRemInPixels,
      twoRemInPixels,
      document.body,
    );

    if (this.shadow) {
      this.shadow.style.top = `calc(${y}px - ${BombContainer.bombRadius}rem)`;
      this.shadow.style.left = `calc(${x}px - ${BombContainer.bombRadius}rem)`;
    }
    event.stopPropagation();
  };

  onDragEndHandler = event => {
    const { id, setNewPosition } = this.props;

    const twoRemInPixels = remInPixels(BombContainer.bombRadius);
    //browser window limits
    const { x, y } = BombContainer.getContainerLimitedCoordinates(
      event.clientX,
      event.clientY,
      twoRemInPixels,
      twoRemInPixels,
      document.body,
    );

    setNewPosition(id, x, y);

    this.setState(() => ({
      dragState: dragStateOptions.INACTIVE,
    }));

    if (this.shadow) {
      document.body.removeChild(this.shadow);
      this.shadow = null;
    }
    event.stopPropagation();
  };

  updateShadow = timer => {
    if (!this.shadow) return;

    if (timer === 0) {
      document.body.removeChild(this.shadow);
      this.shadow = null;
    } else {
      this.shadow.firstChild.innerHTML = timer;
    }
  };

  componentDidUpdate(prevProps) {
    const { timer: prevTimer } = prevProps;
    const { timer } = this.props;

    if (timer === prevTimer) return;

    this.updateShadow(timer);
  }

  decreaseTimerTimeoutCallback = () => {
    const {
      id,
      timer,
      decreaseBombTimer,
      deleteBomb,
      decreaseScore,
    } = this.props;

    if (timer > 0) {
      decreaseBombTimer(id);
      this.decraseTimerTimeout = setTimeout(
        this.decreaseTimerTimeoutCallback,
        1000,
      );
    }
    if (timer === 1) {
      decreaseScore();
      deleteBomb(id);
    }
  };

  componentDidMount() {
    this.decraseTimerTimeout = setTimeout(
      this.decreaseTimerTimeoutCallback,
      1000,
    );
  }

  render() {
    const { timer, color, x_pos, y_pos } = this.props;
    const { dragState } = this.state;

    const twoRemInPixels = remInPixels(BombContainer.bombRadius);
    //browser window limits
    let { x, y } = BombContainer.getContainerLimitedCoordinates(
      x_pos,
      y_pos,
      twoRemInPixels,
      twoRemInPixels,
      document.body,
    );

    return (
      <Bomb
        x_pos={`${x}px`}
        y_pos={`${y}px`}
        radius={BombContainer.bombRadius}
        timer={timer}
        color={color}
        dragState={dragState}
        onDrag={this.onDragHandler}
        onDragStart={this.onDragStartHandler}
        onDragEnd={this.onDragEndHandler}
      />
    );
  }
}

const mapsStateToProps = ({ bombs: { bombs } }, props) => bombs[props.id];

export default connect(mapsStateToProps, {
  deleteBomb,
  decreaseBombTimer,
  setNewPosition: updatePosition,
  decreaseScore,
})(BombContainer);
