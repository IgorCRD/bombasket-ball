import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GameUiStyled = styled.div`
  width: 95vw;
  height: 89vh;
  padding: 1vh 2.5vw 3vh 2.5vw;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const GameUi = ({ score, timer, children }) => (
  <GameUiStyled>
    <h1>Score: {score}</h1>
    <h1 style={{ alignSelf: 'flex-end' }}>Change In: {timer}s</h1>
    {children}
  </GameUiStyled>
);

GameUi.propTypes = {
  score: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
  children: PropTypes.element,
};

GameUi.defaultProps = {
  children: null,
};

export default GameUi;
