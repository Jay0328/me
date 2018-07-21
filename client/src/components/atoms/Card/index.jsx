import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';

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
      <section className={cx(classes.card, className)}>
        {children}
      </section>
    );
  }
}

export default Card;
