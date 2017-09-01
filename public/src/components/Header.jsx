import React from 'react';
import PropTypes from 'prop-types';
import AboutMe from './AboutMe';

const Header = ({ mode }) => {
  let headerContent = null;
  if (mode === 'default') headerContent = <AboutMe />;
  else if (mode === 'tags') headerContent = <div className="header-content">Tags</div>;
  return (
    <header>
      {headerContent}
    </header>
  );
};

Header.propTypes = {
  mode: PropTypes.string
};

Header.defaultProps = {
  mode: 'default'
};

export default Header;
