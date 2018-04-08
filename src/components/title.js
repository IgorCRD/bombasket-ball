import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleStyle = styled.div`
  font-weight: bolder;
  font-size: 2em;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 7vh;
  margin: 0px;
`;

const Title = ({ title }) => (
  <FlexCenter>
    <TitleStyle>{title}</TitleStyle>
  </FlexCenter>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
