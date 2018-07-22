import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from '../styles';

@injectSheet(styles)
class HeaderBackground extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    mode: PropTypes.string.isRequired
  }

  handleBackgroundImage = () => {
    const { mode, match } = this.props;
    const {
      year,
      month,
      day,
      url
    } = match.params;
    return mode === 'article' ?
      `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),
      url("/covers/${year}-${month}-${day}-${url}.jpg")` :
      `url(/covers/${mode}.jpg)`;
  }

  render() {
    const { classes } = this.props;
    return (
      <section
        className={classes.img}
        style={{ backgroundImage: this.handleBackgroundImage() }}
      />
    );
  }
}

export default HeaderBackground;
