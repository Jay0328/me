import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { FooterContainer } from '../containers';

const App = ({ children }) => {
  return (
    <div className="wrapper">
      <Navbar />
      <main>
        {children}
      </main>
      <FooterContainer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
