import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BombBoxContainer from 'containers/bomb-box-container';
import { setBoxOrder } from 'actions/game-actions';
import { randomScrambler, colors, colorShades } from 'src/utils';

const BombBoxChangerStyle = styled.div`
  flex-grow: 1;
  width: 100%;
  max-height: 15%;

  display: flex;
  justify-content: space-around;
`;

class BombBoxChanger extends React.Component {
  static propTypes = {
    boxOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
    changeTimer: PropTypes.number.isRequired,
    setBoxOrder: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { changeTimer, setBoxOrder, boxOrder } = this.props;
    const { changeTimer: prevChangeTimer } = prevProps;

    if (prevChangeTimer === changeTimer || changeTimer !== 0) return;

    const newBoxOrder = randomScrambler(boxOrder);
    setBoxOrder(newBoxOrder);
  }

  render() {
    const [first, second, third] = this.props.boxOrder;
    const colorKeys = Object.keys(colors);
    const colorShadesKeys = Object.keys(colorShades);

    return (
      <BombBoxChangerStyle>
        <BombBoxContainer
          color={colors[colorKeys[first]]}
          colorShade={colorShades[colorShadesKeys[first]]}
          order={first}
        />
        <BombBoxContainer
          color={colors[colorKeys[second]]}
          colorShade={colorShades[colorShadesKeys[second]]}
          order={second}
        />
        <BombBoxContainer
          color={colors[colorKeys[third]]}
          colorShade={colorShades[colorShadesKeys[third]]}
          order={third}
        />
      </BombBoxChangerStyle>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  boxOrder: game.boxOrder,
  changeTimer: game.changeTimer,
});

export default connect(mapStateToProps, { setBoxOrder })(BombBoxChanger);
