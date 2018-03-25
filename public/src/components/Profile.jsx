import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { pure } from 'recompose';
import AboutMe from './AboutMe';
import { md } from './theme/rwd';

const styles = {
  profile: {
    width: '220px',
    [`@media (max-width: ${md - 1}px)`]: {
      display: 'none'
    }
  }
};

const Profile = ({ classes }) => (
  <aside className={classes.profile}>
    <AboutMe />
  </aside>
);

Profile.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default injectSheet(styles)(pure(Profile));
