import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import container from '../theme/container';

const styles = {
  container
};

const routePage = ({ title, shouldRefetchData }) => WrappedComponent => {
  @injectSheet(styles)
  class RoutePage extends Component {
    static propTypes = {
      classes: PropTypes.shape().isRequired,
      fetchData: PropTypes.func
    }

    static defaultProps = {
      fetchData: () => { }
    }

    static displayName = `RoutePage(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

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

    handleTitle = t => typeof t === 'function' ? `${t(this.props)} | Jay Blog` : `${t ? `${t} | ` : ''}Jay Blog`

    render() {
      const { classes } = this.props;
      return (
        <main className={classes.container}>
          <WrappedComponent {...this.props} />
        </main>
      );
    }
  }
  return RoutePage;
};

export default routePage;
