import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ContactInfo from 'Molecules/ContactInfo';
import { grey } from 'Theme/colors';
import styles from './styles';

@injectSheet(styles)
class Footer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  }

  state = { year: new Date().getFullYear() }

  render() {
    const { classes } = this.props;
    const { year } = this.state;
    return (
      <footer className={classes.footer}>
        <ContactInfo
          color={grey}
          size={50}
        />
        <p className={classes.copyright}>
          <span>
            Copyright © Jay Blog {year}
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
