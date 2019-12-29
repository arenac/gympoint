import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper } from './styles';

const HeaderWithRuter = withRouter(props => <Header {...props} />);

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <HeaderWithRuter />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
