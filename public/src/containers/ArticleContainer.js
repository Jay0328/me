import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Article from '../components/Article';
import { fetchArticleIfNeed } from '../actions/articleActions';

const mapStateToProps = state => ({
  content: state.getIn(['article', 'content'])
});

const mapDispatchToProps = dispatch => ({
  fetchArticle(year, month, day, url) {
    dispatch(fetchArticleIfNeed(year, month, day, url));
  }
});

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);

export default withRouter(ArticleContainer);
