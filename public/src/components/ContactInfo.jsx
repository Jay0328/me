import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import injectSheet from 'react-jss';
import { facebook, github } from '../../config';
import { themeColor } from './theme/colors';

const contacts = [
  {
    url: facebook,
    icon: 'fab fa-facebook'
  },
  {
    url: github,
    icon: 'fab fa-github'
  }
];

const styles = {
  contactInfo: {
    width: '200px'
  },
  icon: {
    color: props => props.color,
    fontSize: props => props.fontSize,
    margin: props => `0 ${props.fontSize / 2}px`,
    '&:hover': {
      color: themeColor
    }
  }
};

const ContactInfo = ({ classes }) => (
  <div className={classes.contactInfo}>
    {
      contacts.map(({ url, icon }) => (
        <a
          key={url}
          className={classes.icon}
          target="_blank"
          rel="external nofollow noopener noreferrer"
          href={url}
        >
          <i className={icon} aria-hidden="true"></i>
        </a>
      ))
    }
  </div>
);

ContactInfo.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default injectSheet(styles)(pure(ContactInfo));
