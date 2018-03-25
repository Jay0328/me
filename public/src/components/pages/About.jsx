import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import RoutePage from '../hoc/RoutePage';

const styles = {
  about: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    '& > p': {
      fontSize: '50px',
      textAlign: 'center'
    }
  }
};

const About = ({ classes }) => (
  <main className={classes.about}>
    <p>Coming Soon...</p>
  </main>
);

About.propTypes = {
  classes: PropTypes.shape().isRequired
};

const AboutPage = RoutePage(
  injectSheet(styles)(About),
  { title: 'About' }
);

export default AboutPage;
