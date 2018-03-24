import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import RoutePage from '../hoc/RoutePage';
import ConnectWithToJS from '../hoc/ConnectWithToJS';
import ArticlePreview from '../ArticlePreview';
import { themeColor } from '../theme/colors';
import { fetchArticlesInCategory } from '../../actions/categoriesActions';

const styles = {
  categoryName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > a': {
      '& > i': {
        color: 'black',
        marginRight: '10px',
        cursor: 'pointer',
        '&:hover': {
          color: themeColor
        }
      }
    },
    '& > h1': {
      margin: '0'
    }
  },
  articles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  article: {
    width: 'fit-content'
  }
};

const Category = ({ classes, match, articles }) => (
  <main>
    <section className={classes.categoryName}>
      <Link to="/categories/">
        <i className="far fa-arrow-alt-circle-left"></i>
      </Link>
      <h1>{match.params.category}</h1>
    </section>
    <section className={classes.articles}>
      {(articles[match.params.category] || []).map(article => (
        <ArticlePreview
          key={`${article.year}-${article.month}-${article.day}-${article.url}`}
          className={classes.article}
          {...article}
        />
      ))}
    </section>
  </main>
);

Category.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  articles: PropTypes.shape().isRequired
};

const CategoryPage = RoutePage(injectSheet(styles)(Category));

const mapStateToProps = state => ({
  articles: state.getIn(['categories', 'articles'])
});

const mapDispatchToProps = dispatch => ({
  fetchData(props) {
    const categoryName = props.match.params.category;
    dispatch(fetchArticlesInCategory({ categoryName }));
  }
});

const CategoryContainer = ConnectWithToJS(
  mapStateToProps,
  mapDispatchToProps,
  CategoryPage
);

export default withRouter(CategoryContainer);

