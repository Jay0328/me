import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      return <WrappedComponent {...this.props} />;
    }
  }
  RoutePage.displayName = `RoutePage(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  RoutePage.propTypes = {
    fetchData: PropTypes.func.isRequired
  };
  return RoutePage;
};

export default routePage;
