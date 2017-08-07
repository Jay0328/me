import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const App = ({ children, isAuth, logout }) => {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="container">
        {children}
      </main>
      <footer>
        {isAuth ? <a onClick={logout()}>LOGOUT</a> : <Link to="/login">LOGIN</Link>}
      </footer>
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
