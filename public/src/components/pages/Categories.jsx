import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import RoutePage from '../hoc/RoutePage';
import { fetchCategoriesIfNeed } from '../../actions/categoriesActions';

const styles = {

};

const Categories = ({ categories }) => (
  <main>
    {categories.map(({ categoryName, articlesCount }) => (
      <Link
        key={categoryName}
        to={`/categories/${categoryName}/`}
      >
        <div>{categoryName}</div>
        <div>{articlesCount}</div>
      </Link>
    ))}
  </main>
);

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const CategoriesPage = RoutePage(injectSheet(styles)(Categories));

const mapStateToProps = state => ({
  categories: state.getIn(['categories', 'categories']).toArray()
});

const mapDispatchToProps = dispatch => ({
  fetchData() {
    dispatch(fetchCategoriesIfNeed());
  }
});

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPage);

export default withRouter(CategoriesContainer);

