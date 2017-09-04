import React from 'react';
import { pure } from 'recompose';
import AboutMe from './AboutMe';
import ContactInfo from './ContactInfo';

const Profile = () => {
  return (
    <aside className="profile">
      <AboutMe />
      <ContactInfo />
    </aside>
  );
};

export default pure(Profile);
