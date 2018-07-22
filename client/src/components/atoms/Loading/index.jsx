import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './styles';

@injectSheet(styles)
class Loading extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}

export default Loading;
