import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import RoutePage from 'Layouts/RoutePage';
import ConnectWithToJS from 'Layouts/ConnectWithToJS';
import Icon from 'Components/atoms/Icon';
import ArticlePreview from 'Components/molecules/ArticlePreview';
import { fetchArticlesInCategory } from 'Actions/categoriesActions';
import styles from './styles';

const mapStateToProps = state => ({
  articles: state.getIn(['categories', 'articles'])
});

const mapDispatchToProps = dispatch => ({
  fetchData(props) {
    const categoryName = props.match.params.category;
    dispatch(fetchArticlesInCategory({ categoryName }));
  }
});

@withRouter
@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@RoutePage({
  title: ({ match }) => match.params.category
})
@injectSheet(styles)
class Category extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    articles: PropTypes.shape().isRequired
  }

  render() {
    const { classes, match, articles } = this.props;
    const articlesInCategory = articles[match.params.category] || [];
    return (
      <main>
        <section className={classes.categoryName}>
          <Link to="/categories/">
            <Icon name="far fa-arrow-alt-circle-left" />
          </Link>
          <h1>{match.params.category}</h1>
        </section>
        <section className={classes.articles}>
          {articlesInCategory.map(article => (
            <ArticlePreview
              key={`${article.year}-${article.month}-${article.day}-${article.url}`}
              className={classes.article}
              {...article}
            />
          ))}
        </section>
      </main>
    );
  }
}

export default Category;

