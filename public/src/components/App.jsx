import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { pure } from 'recompose';
import Navbar from './Navbar';
import { FooterContainer } from '../containers';

const App = ({ children }) => (
  <div className="wrapper">
    <Navbar />
    <main>
      {children}
    </main>
    <FooterContainer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(pure(App));
