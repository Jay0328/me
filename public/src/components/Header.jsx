import React from 'react';
//  import PropTypes from 'prop-types';

const Header = () => {
  return (
    <header>
      <div className="about-me">
        <img src="/images/profile.png" alt="me" />
        <h4>Taku</h4>
        <p>人生就是&nbsp;!#$(%^(@#^$*#@!$^&@$!(</p>
      </div>
    </header>
  );
};

Header.propTypes = {
};

Header.defaultProps = {
};

export default Header;
