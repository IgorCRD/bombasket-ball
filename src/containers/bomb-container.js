import React from 'react';
import PropTypes from 'prop-types';

import Bomb from 'components/bomb';
import { remInPixels } from 'src/utils';

export const dragStateOptions = {
  INACTIVE: 'INACTIVE',
  BEING_DRAGGED: 'BEING_DRAGGED',
};

class BombContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragState: dragStateOptions.INACTIVE,
      x_pos: props.x_pos,
      y_pos: props.y_pos,
    };
  }

  static propTypes = {
    x_pos: PropTypes.number.isRequired,
    y_pos: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
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
      x_pos: x,
      y_pos: y,
    }));

    document.body.removeChild(this.shadow);
  };

  render() {
    const { timer, color } = this.props;
    const { dragState, x_pos, y_pos } = this.state;

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

export default BombContainer;
