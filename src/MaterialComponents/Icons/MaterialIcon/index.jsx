import React from 'react';
import styled from '@emotion/styled';
import StylePropType from 'react-style-proptype';
import PropTypes from 'prop-types';

const Wrapper = styled.span(() => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  height: 24,
}));

const Icon = styled.div(() => ({
  color: '#707070',
  cursor: 'pointer',
}));

function MaterialIcon({ children, customStyle, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Icon style={customStyle}>{children}</Icon>
    </Wrapper>
  );
}

MaterialIcon.propTypes = {
  customStyle: StylePropType,
  children: PropTypes.node.isRequired,
};

MaterialIcon.defaultProps = {
  customStyle: {},
};

export default MaterialIcon;
