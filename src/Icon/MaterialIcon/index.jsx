import React from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const Wrapper = styled('span')(() => ({
  color: '#707070',
  display: 'inline-block',
  height: 24,
  verticalAlign: 'middle',
}));

const MaterialIcon = ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
);

MaterialIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MaterialIcon;
