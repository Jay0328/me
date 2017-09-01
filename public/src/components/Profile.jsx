import React from 'react';
import AboutMe from './AboutMe';
import ContactInfo from './ContactInfo';
//  import PropTypes from 'prop-types';
//  import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <aside className="profile">
      <AboutMe />
      <ContactInfo />
    </aside>
  );
};

Profile.propTypes = {
};

Profile.defaultProps = {
};

export default Profile;
