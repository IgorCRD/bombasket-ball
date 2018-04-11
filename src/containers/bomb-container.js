import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Bomb from 'components/bomb';
import { remInPixels } from 'src/utils';
import { subtractBombTimerByOne, updatePosition } from 'actions/bombs-actions';

export const dragStateOptions = {
  INACTIVE: 'INACTIVE',
  BEING_DRAGGED: 'BEING_DRAGGED',
};

class BombContainer extends React.Component {
  static propTypes = {
    x_pos: PropTypes.number.isRequired,
    y_pos: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    subtractBombTimerByOne: PropTypes.func.isRequired,
    setNewPosition: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
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
    this.setState(() => ({
      dragState: dragStateOptions.BEING_DRAGGED,
    }));

    this.shadow = (event.target || event.srcElement).cloneNode(true);
    this.shadow.style.opacity = '1';
    document.body.appendChild(this.shadow);
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

    this.shadow.style.top = `calc(${y}px - ${BombContainer.bombRadius}rem)`;
    this.shadow.style.left = `calc(${x}px - ${BombContainer.bombRadius}rem)`;
  };

  onDragEndHandler = event => {
    const twoRemInPixels = remInPixels(BombContainer.bombRadius);
    //browser window limits
    const { x, y } = BombContainer.getContainerLimitedCoordinates(
      event.clientX,
      event.clientY,
      twoRemInPixels,
      twoRemInPixels,
      document.body,
    );

    this.setState(() => ({
      dragState: dragStateOptions.INACTIVE,
    }));

    const { id, setNewPosition } = this.props;
    setNewPosition(id, x, y);

    document.body.removeChild(this.shadow);
  };

  subtractTimerTimeoutCallback = () => {
    const { id, timer, subtractBombTimerByOne } = this.props;

    if (timer > 0) {
      subtractBombTimerByOne(id);
      this.subtractTimeout = setTimeout(
        this.subtractTimerTimeoutCallback,
        1000,
      );
    }
  };

  componentDidMount() {
    this.subtractTimeout = setTimeout(this.subtractTimerTimeoutCallback, 1000);
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

const mapsStateToProps = ({ bombs }, props) => bombs.bombs[props.id];

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      subtractBombTimerByOne,
      setNewPosition: updatePosition,
    },
    dispatch,
  );
};

export default connect(mapsStateToProps, mapDispatchToProps)(BombContainer);
