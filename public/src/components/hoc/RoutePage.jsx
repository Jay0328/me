import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import getDisplayName from '../../utils/getDisplayName';
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

    static displayName = `RoutePage(${getDisplayName(WrappedComponent)})`

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

    componentDidUpdate(prevProps) {
      scrollTo(0, 0);
      document.title = this.handleTitle(title);
      if (shouldRefetchData && shouldRefetchData(prevProps, this.props)) {
        this.props.fetchData(this.props);
      }
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
