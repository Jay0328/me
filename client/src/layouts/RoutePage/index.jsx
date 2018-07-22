import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Loading from 'Atoms/Loading';
import getDisplayName from 'Utils/getDisplayName';
import styles from './styles';

const mapStateToProps = state => ({
  isFetching: state.getIn(['UI', 'isFetching'])
});

const routePage = ({ title, shouldRefetchData }) => WrappedComponent => {
  @connect(mapStateToProps)
  @injectSheet(styles)
  class RoutePage extends Component {
    static displayName = `RoutePage(${getDisplayName(WrappedComponent)})`

    static propTypes = {
      classes: PropTypes.shape().isRequired,
      isFetching: PropTypes.bool.isRequired,
      fetchData: PropTypes.func
    }

    static defaultProps = {
      fetchData: () => { }
    }

    constructor(props) {
      super(props);
      document.title = this.handleTitle(title);
    }

    componentDidMount() {
      const { props } = this;
      const { fetchData } = props;
      window.scrollTo(0, 0);
      fetchData(props);
    }

    componentDidUpdate(prevProps) {
      document.title = this.handleTitle(title);
      if (shouldRefetchData && shouldRefetchData(prevProps, this.props)) {
        window.scrollTo(0, 0);
        this.props.fetchData(this.props);
      }
    }

    handleTitle = t => typeof t === 'function' ? `${t(this.props)} | Jay Blog` : `${t ? `${t} | ` : ''}Jay Blog`

    render() {
      const { classes, isFetching } = this.props;
      return !isFetching ? (
        <main className={classes.container}>
          <WrappedComponent {...this.props} />
        </main>
      ) : (<Loading />);
    }
  }
  return RoutePage;
};

export default routePage;
