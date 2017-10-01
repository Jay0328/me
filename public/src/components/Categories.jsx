import React from 'react';
import PropTypes from 'prop-types';
//  import { Link } from 'react-route r-dom';
import { pure } from 'recompose';
import Header from './Header';
import Profile from './Profile';

const CategoriesItem = pure(({ category }) => (
  <div>
    <div>{category.categoryName}</div>
    <div>{category.articlesCount}</div>
  </div>
));

CategoriesItem.propTypes = {
  category: PropTypes.shape().isRequired
};

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchCategories();
  }

  componentDidMount() {
    scrollTo(0, 0);
    document.title = '分類 | Taku\'s blog';
  }

  render() {
    const categoryFilter = this.props.match.params.category;
    const { categories } = this.props;
    console.log(categories, categoryFilter);

    const categoriesList = categories.map(category =>
      (<CategoriesItem key={category.categoryName} category={category} />)
    );

    return (
      <section className="categories">
        <Header mode="categories" />
        <div className="container">
          <div className="categories-container">
            {categoriesList}
          </div>
          <Profile />
        </div>
      </section>
    );
  }
}

Categories.propTypes = {
  match: PropTypes.shape().isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchCategories: PropTypes.func.isRequired
};

export default Categories;
