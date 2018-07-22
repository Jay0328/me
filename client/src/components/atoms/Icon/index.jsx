import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';

const Icon = ({ classes, className, name }) => (
  <i className={cx(classes.icon, className, name)} ></i>
);

Icon.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  className: ''
};

export default injectSheet(styles)(Icon);
