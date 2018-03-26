import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import container from '../theme/container';

const styles = {
  container
};

const routePage = (WrappedComponent, { title, shouldRefetchData }) => {
  class RoutePage extends Component {
    constructor(props) {
      super(props);
      document.title = this.handleTitle(title);
    }

    componentDidMount() {
      const { props } = this;
      const { fetchData } = props;
      scrollTo(0, 0);
      fetchData(props);
    }

    componentWillReceiveProps(nextProps) {
      scrollTo(0, 0);
      if (shouldRefetchData && shouldRefetchData(this.props, nextProps)) {
        this.props.fetchData(nextProps);
      }
    }

    componentDidUpdate() {
      document.title = this.handleTitle(title);
    }

    handleTitle = t => typeof t === 'function' ? `${t(this.props)} | YC Blog` : `${t ? `${t} | ` : ''}YC Blog`

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
    fetchData: PropTypes.func
  };
  RoutePage.defaultProps = {
    fetchData: () => { }
  };
  return injectSheet(styles)(RoutePage);
};

export default routePage;
