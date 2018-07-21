import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import RoutePage from 'Layouts/RoutePage';
import ConnectWithToJS from 'Layouts/ConnectWithToJS';
import Category from 'Components/molecules/Category';
import { fetchCategoriesIfNeed } from 'Actions/categoriesActions';
import styles from './styles';

const mapStateToProps = state => ({
  categories: state.getIn(['categories', 'categories'])
});

const mapDispatchToProps = dispatch => ({
  fetchData() {
    dispatch(fetchCategoriesIfNeed());
  }
});

@withRouter
@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@RoutePage({
  title: 'Categories'
})
@injectSheet(styles)
class Categories extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  renderCateogry = ({ categoryCover, categoryName, articlesCount }) => (
    <Category
      key={categoryName}
      categoryName={categoryName}
      categoryCover={categoryCover}
      articlesCount={articlesCount}
    />
  )

  render() {
    const { classes, categories } = this.props;
    return (
      <main className={classes.categories}>
        {categories.map(this.renderCateogry)}
      </main>
    );
  }
}

export default Categories;

