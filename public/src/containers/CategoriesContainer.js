import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Categories from '../components/Categories';
import { fetchCategoriesIfNeed } from '../actions/categoriesActions';

const mapStateToProps = state => ({
  categories: state.getIn(['categories', 'categories']).toArray()
});

const mapDispatchToProps = dispatch => ({
  fetchCategories() {
    dispatch(fetchCategoriesIfNeed());
  }
});

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);

export default withRouter(CategoriesContainer);
