import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { facebook, github } from '../../config';

const Footer = ({ isAuth, logout }) => {
  return (
    <footer>
      <div className="">
      </div>
      <div className="contact-info">
        <a className="contact-info-icon" target="_blank" href={facebook}>
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </a>
        <a className="contact-info-icon" target="_blank" href={github}>
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
      </div>
      {isAuth ? <a onClick={logout}>{' '}</a> : <Link to="/login">{' '}</Link>}
    </footer>
  );
};

Footer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

Footer.defaultProps = {
};

export default Footer;
