import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import RoutePage from '../hoc/RoutePage';
import ConnectWithToJS from '../hoc/ConnectWithToJS';
import Markdown from '../Markdown';
import { fetchArticleIfNeed } from '../../actions/articleActions';

const styles = {
  article: {
  }
};

const Article = ({ classes, content }) => (
  <main className={classes.article}>
    <Markdown className="article-content" content={content} />
  </main>
);

Article.propTypes = {
  classes: PropTypes.shape().isRequired,
  content: PropTypes.string.isRequired
};

const ArticlePage = RoutePage(
  injectSheet(styles)(Article),
  {
    title: ({ title }) => title
  }
);

const mapStateToProps = state => ({
  title: state.getIn(['article', 'title']),
  content: state.getIn(['article', 'content'])
});

const mapDispatchToProps = dispatch => ({
  fetchData(props) {
    const { year, month, day, url } = props.match.params;
    dispatch(fetchArticleIfNeed({ year, month, day, url }));
  }
});

const ArticleContainer = ConnectWithToJS(
  mapStateToProps,
  mapDispatchToProps,
  ArticlePage
);

export default withRouter(ArticleContainer);
