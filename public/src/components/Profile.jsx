import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
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

@injectSheet(styles)
class Profile extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <aside className={classes.profile}>
        <AboutMe />
      </aside>
    );
  }
}

export default Profile;
