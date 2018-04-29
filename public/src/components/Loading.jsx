import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  loading: {
  }
};

@injectSheet(styles)
class Loading extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loading}>
        Loading...
      </div>
    );
  }
}

export default Loading;
