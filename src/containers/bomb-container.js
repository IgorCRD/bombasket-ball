import React from 'react';
import Bomb, { colors } from 'components/bomb';
import { remInPixels } from 'src/utils';

export const dragStateOptions = {
  INACTIVE: 'INACTIVE',
  BEING_DRAGGED: 'BEING_DRAGGED',
};

const bombRadius = 2;

class BombContainer extends React.Component {
  state = {
    dragState: dragStateOptions.INACTIVE,
    x_pos: 300,
    y_pos: 300,
  };

  onDragStartHandler = event => {
    this.shadow = event.target.cloneNode(true);
    document.body.appendChild(this.shadow);
    this.shadow.style.opacity = '1';
    this.setState(() => ({
      dragState: dragStateOptions.BEING_DRAGGED,
    }));
  };

  onDragHandler = event => {
    let { clientX, clientY } = event;
    if (clientX === 0 && clientY === 0) return;

    const twoRemInPixels = remInPixels(2);

    //browser window limits
    if (clientX < twoRemInPixels) clientX = twoRemInPixels;
    if (clientY < twoRemInPixels) clientY = twoRemInPixels;
    if (Math.abs(clientX - document.body.clientWidth) < twoRemInPixels)
      clientX = document.body.clientWidth - twoRemInPixels;
    if (Math.abs(clientY - document.body.clientHeight) < twoRemInPixels)
      clientY = document.body.clientHeight - twoRemInPixels;

    this.shadow.style.top = `Calc(${clientY}px - ${bombRadius}rem)`;
    this.shadow.style.left = `Calc(${clientX}px - ${bombRadius}rem)`;
  };

  onDragEndHandler = event => {
    let { clientX, clientY } = event;
    const twoRemInPixels = remInPixels(2);

    //browser window limits
    if (clientX < twoRemInPixels) clientX = twoRemInPixels;
    if (clientY < twoRemInPixels) clientY = twoRemInPixels;
    if (Math.abs(clientX - document.body.clientWidth) < twoRemInPixels)
      clientX = document.body.clientWidth - twoRemInPixels;
    if (Math.abs(clientY - document.body.clientHeight) < twoRemInPixels)
      clientY = document.body.clientHeight - twoRemInPixels;

    this.setState(
      () => ({
        dragState: dragStateOptions.INACTIVE,
        x_pos: clientX,
        y_pos: clientY,
      }),
      () => {
        document.body.removeChild(this.shadow);
      },
    );
  };

  render() {
    const { dragState, x_pos, y_pos } = this.state;
    return (
      <Bomb
        key={100}
        x_pos={`${x_pos}px`}
        y_pos={`${y_pos}px`}
        radius={bombRadius}
        timer={7}
        color={colors.green}
        dragState={dragState}
        onDrag={this.onDragHandler}
        onDragStart={this.onDragStartHandler}
        onDragEnd={this.onDragEndHandler}
      />
    );
  }
}

export default BombContainer;
