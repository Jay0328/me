import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: themeColor,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
};

@injectSheet(styles)
class Footer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.footer}>
        <ContactInfo
          color={grey}
          fontSize={50}
        />
        <p className={classes.copyright}>
          <span>
            Copyright © Taku Blog {new Date().getFullYear()}
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
  }
}

export default Footer;
