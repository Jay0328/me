import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import container from '../theme/container';

const styles = {
  container
};

const routePage = (WrappedComponent, shouldRefetchData) => {
  class RoutePage extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      scrollTo(0, 0);
      this.props.fetchData(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (shouldRefetchData && shouldRefetchData(this.props, nextProps)) {
        scrollTo(0, 0);
        this.props.fetchData(nextProps);
      }
    }

    render() {
      const { classes } = this.props;
      return (
        <main className={classes.container}>
          <WrappedComponent {...this.props} />
        </main>
      );
    }
  }
  RoutePage.displayName = `RoutePage(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  RoutePage.propTypes = {
    classes: PropTypes.shape().isRequired,
    fetchData: PropTypes.func.isRequired
  };
  return injectSheet(styles)(RoutePage);
};

export default routePage;
