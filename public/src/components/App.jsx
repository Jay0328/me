import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const App = ({ children, isAuth, logout }) => {
  return (
    <div>
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
      {isAuth ? <a onClick={logout()}>LOGOUT</a> : <Link to="/login">LOGIN</Link>}
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

App.defaultProps = {
};

export default App;
