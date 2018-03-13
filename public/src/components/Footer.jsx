import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import injectSheet from 'react-jss';
import ContactInfo from './ContactInfo';
import { themeColor, grey, lightGrey } from './theme/colors';

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 0'
  },
  copyright: {
    fontSize: '14px',
    color: lightGrey,
    marginTop: '20px',
    lineHeight: 1.8,
    '& span': {
      '&:first-child': {
        marginRight: '10px'
      },
      '&:nth-child(3)': {
        marginLeft: '30px'
      }
    },
    '& a': {
      textDecoration: 'none',
      color: themeColor,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
};

const Footer = ({ classes }) => (
  <footer className={classes.footer}>
    <ContactInfo
      color={grey}
      fontSize={50}
    />
    <p className={classes.copyright}>
      <span>
        Copyright © YC Blog {new Date().getFullYear()}
      </span>
      <br />
      <span>
        Theme by&nbsp;
        <a
          target="_blank"
          rel="external nofollow noopener noreferrer"
          href="http://huangxuan.me/"
        >
          Hux
        </a>
      </span>
    </p>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default injectSheet(styles)(pure(Footer));
