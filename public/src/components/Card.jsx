import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { pure } from 'recompose';
import { themeColor, opacityColor } from './theme/colors';

const styles = {
  card: {
    padding: '15px 20px',
    margin: '20px 0',
    cursor: 'pointer',
    transition: 'all 0.1s',
    boxShadow: '5px 5px 10px -5px rgba(14, 14, 14, .26)',
    '&:hover': {
      transform: 'scale(1.05, 1.05)',
      boxShadow: `10px 10px 30px -5px ${opacityColor(themeColor, 0.5)}`
    }
  }
};

const Card = ({ classes, className, children }) => (
  <main className={`${classes.card}${` ${className}`}`}>
    {children}
  </main>
);

Card.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Card.defaultProps = {
  className: ''
};

export default injectSheet(styles)(pure(Card));
