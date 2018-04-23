import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
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

@injectSheet(styles)
class Card extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { classes, className, children } = this.props;
    return (
      <main className={`${classes.card}${` ${className}`}`}>
        {children}
      </main>
    );
  }
}

export default Card;
