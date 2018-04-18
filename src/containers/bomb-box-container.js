import React from 'react';
import PropTypes from 'prop-types';

import BombBox from 'components/bomb-box';

class BombBoxContainer extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    colorShade: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
  };

  state = {
    over: false,
  };

  onDropCallback = event => {
    event.stopPropagation();
    event.preventDefault();

    //eslint-disable-next-line
    console.log(event.dataTransfer.getData('text/plain'));
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

export default BombBoxContainer;
