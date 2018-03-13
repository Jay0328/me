import React from 'react';
//  import PropTypes from 'prop-types';
import { pure } from 'recompose';
import { connect } from 'react-redux';

const Header = () => (
  <header>
    header
  </header>
);

const mapStateToProps = state => ({
  date: state.getIn(['article', 'date']),
  title: state.getIn(['article', 'title']),
  tags: state.getIn(['article', 'tags']).toArray(),
});

const mapDispatchToProps = () => ({
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default pure(HeaderContainer);
