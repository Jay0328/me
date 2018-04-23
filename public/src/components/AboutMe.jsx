import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import ContactInfo from './ContactInfo';
import { themeColor, moreLightGrey } from './theme/colors';

const styles = {
  aboutMe: {
    color: moreLightGrey,
    '& > h5': {
      marginLeft: '15px',
      '& a': {
        color: moreLightGrey,
        textDecoration: 'none',
        '&:hover': {
          color: themeColor
        }
      }
    },
    '& > hr': {
      margin: '20px 0',
      border: '0',
      borderTop: '1px solid #eee'
    },
    '& > p': {
      marginLeft: '15px'
    }
  }
};

@injectSheet(styles)
class AboutMe extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <section className={classes.aboutMe}>
        <hr />
        <h5>
          <Link to="/about/">
            ABOUT ME
          </Link>
        </h5>
        <img src="/images/profile.png" alt="頭像" />
        <p>No music no life.</p>
        <ContactInfo
          color={moreLightGrey}
          fontSize={30}
        />
      </section>
    );
  }
}

export default AboutMe;
