import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Article from '../components/Article';
import { fetchArticleIfNeed } from '../actions/articleActions';

const mapStateToProps = state => ({
  content: state.getIn(['article', 'content'])
});

const mapDispatchToProps = dispatch => ({
  fetchArticle(year, month, day, title) {
    dispatch(fetchArticleIfNeed(year, month, day, title));
  }
});

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);

export default withRouter(ArticleContainer);
