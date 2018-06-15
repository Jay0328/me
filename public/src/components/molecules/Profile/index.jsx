import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import AboutMe from 'Components/molecules/AboutMe';
import styles from './styles';

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
