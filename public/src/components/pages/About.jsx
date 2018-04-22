import React, { PureComponent } from 'react';
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

@RoutePage({ title: 'About' })
@injectSheet(styles)
class About extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.about}>
        <p>Coming Soon...</p>
      </main>
    );
  }
}

export default About;
