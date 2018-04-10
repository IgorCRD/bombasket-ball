import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BombContainer from 'containers/bomb-container';
import { addRandomBomb } from 'actions/bombs-field-actions';

class BombsFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBombs: 0,
    };
  }

  static propTypes = {
    addRandomBomb: PropTypes.func.isRequired,
    numberOfBombs: PropTypes.number.isRequired,
    bombs: PropTypes.array.isRequired,
  };

  componentDidMount() {
    const {
      addRandomBomb /*, numberOfBombs: initialNumberOfBombs*/,
    } = this.props;
    //const { addBombTime } = this.state;

    const timeOutCallback = () => {
      const { numberOfBombs: x } = this.state;
      if (x >= 120) {
        return;
      }

      addRandomBomb();
      this.setState(prevState => ({
        numberOfBombs: prevState.numberOfBombs + 1,
      }));

      const time =
        5000 -
        221.1349 * x +
        4.109656 * Math.pow(x, 2) -
        0.03338183 * Math.pow(x, 3) +
        0.00009905938 * Math.pow(x, 4);
      this.addBombTimeout = setTimeout(timeOutCallback, time);
    };

    this.addBombTimeout = setTimeout(timeOutCallback);
  }

  state = {
    numberOfBombs: -1,
  };

  render() {
    const { bombs } = this.props;
    if (!bombs) {
      return null;
    }

    return (
      <React.Fragment>
        {bombs.map((bomb, index) => (
          <BombContainer
            key={index}
            dragState={bomb.dragState}
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

const mapStateToProps = ({ bombsField }) => ({
  bombs: bombsField.bombs,
});

export default connect(mapStateToProps, { addRandomBomb })(BombsFieldContainer);
