import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { facebook, github } from '../../config';

const Footer = ({ isAuth, logout }) => {
  return (
    <footer>
      <div className="copyright">
        <div className="visitor">
          <span>
            本站總訪問量
          </span>
          <span>? 次</span>
          <span>
            本站訪客數
          </span>
          <span>? 次</span>
        </div>
        <span>
          轉載請 CC 內容作者註明
        </span>
        <span>
          Copyright © Taku {new Date().getFullYear()}
        </span>
        <span>
          Icon by&nbsp;
          <i className="fa fa-font-awesome" aria-hidden="true"></i>&nbsp;
          <a target="_blank" rel="external nofollow noopener noreferrer" href="http://fontawesome.io/">
            Font Awesome
          </a>
        </span>
        <span>
          Theme by&nbsp;
          <a target="_blank" rel="external nofollow noopener noreferrer" href="https://calpa.me">
            Calpa Liu
          </a>
          {', '}Modified by&nbsp;
          <a href="/">Me</a>
        </span>
      </div>
      <div className="contact-info">
        <a
          className="contact-info-icon"
          target="_blank"
          rel="external nofollow noopener noreferrer"
          href={facebook}
        >
          <i className="fa fa-facebook-square" aria-hidden="true"></i>
        </a>
        <a
          className="contact-info-icon"
          target="_blank"
          rel="external nofollow noopener noreferrer"
          href={github}
        >
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
      </div>
      <hr />
      <div className="secure">
        {isAuth ? <a onClick={logout}>Logout</a> : <Link to="/login">Login</Link>}
      </div>
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
