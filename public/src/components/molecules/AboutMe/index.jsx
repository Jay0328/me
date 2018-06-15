import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { withTheme } from 'react-jss';
import { Link } from 'react-router-dom';
import ContactInfo from 'Components/molecules/ContactInfo';
import styles from './styles';

@withTheme
@injectSheet(styles)
class AboutMe extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    theme: PropTypes.shape().isRequired,
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <section className={classes.aboutMe}>
        <hr />
        <h5 className={classes.header}>
          <Link
            className={classes.link}
            to="/about/"
          >
            ABOUT ME
          </Link>
        </h5>
        <img src="/covers/profile.png" alt="頭像" />
        <p>No music no life.</p>
        <ContactInfo
          color={theme.colors.lighterGrey}
          fontSize={30}
        />
      </section>
    );
  }
}

export default AboutMe;
