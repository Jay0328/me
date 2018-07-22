import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import RoutePage from 'Layouts/RoutePage';
import styles from './styles';

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
        <p>
          Coming Soon...
        </p>
      </main>
    );
  }
}

export default About;
