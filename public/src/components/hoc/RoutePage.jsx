import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ConnectWithToJS from './ConnectWithToJS';
import Loading from '../Loading';
import getDisplayName from '../../utils/getDisplayName';
import container from '../theme/container';

const styles = {
  container
};

const mapStateToProps = state => ({
  isFetching: state.getIn(['UI', 'isFetching'])
});

const routePage = ({ title, shouldRefetchData }) => WrappedComponent => {
  @ConnectWithToJS(mapStateToProps)
  @injectSheet(styles)
  class RoutePage extends Component {
    static propTypes = {
      classes: PropTypes.shape().isRequired,
      isFetching: PropTypes.bool.isRequired,
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
      const { classes, isFetching } = this.props;
      return (
        <main className={classes.container}>
          {!isFetching ? <WrappedComponent {...this.props} /> : <Loading />}
        </main>
      );
    }
  }
  return RoutePage;
};

export default routePage;
