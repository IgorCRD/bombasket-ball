import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  height: 7vh;
  margin: 0px;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = ({ title }) => (
  <FlexCenter>
    <StyledH1>{title}</StyledH1>
  </FlexCenter>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
