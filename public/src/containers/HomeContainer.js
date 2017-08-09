import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Home from '../components/Home';
import { fetchArticlesListIfNeed } from '../actions/articleActions';

const mapStateToProps = state => ({
  articlesList: state.getIn(['articlesList', 'list']).toArray(),
  page: state.getIn(['articlesList', 'page']),
  totalPage: state.getIn(['articlesList', 'totalPage'])
});

const mapDispatchToProps = dispatch => ({
  fetchArticlesList(page) {
    dispatch(fetchArticlesListIfNeed(page));
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default withRouter(HomeContainer);
