import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Background from './Background';
import Content from './Content';
import styles from '../styles';

const HeaderComponent = mode => {
  @injectSheet(styles)
  class Component extends PureComponent {
    static displayName = `${mode.substr(0, 1).toUpperCase()}${mode.substr(1)}`

    static propTypes = {
      classes: PropTypes.shape().isRequired,
      match: PropTypes.shape().isRequired
    }

    render() {
      const { classes, match } = this.props;
      return (
        <main className={classes.header}>
          <Background mode={mode} match={match} />
          <Content mode={mode} />
        </main>
      );
    }
  }
  return Component;
};
export default HeaderComponent;
