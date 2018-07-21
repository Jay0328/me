import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import ContactInfo from 'Components/molecules/ContactInfo';
import { lighterGrey } from 'Theme/colors';
import styles from './styles';

@injectSheet(styles)
class AboutMe extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  }

  render() {
    const { classes } = this.props;
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
          color={lighterGrey}
          fontSize={30}
        />
      </section>
    );
  }
}

export default AboutMe;
