import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
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
  },
  articleOnClick: (year, month, day, url) => e => {
    e.preventDefault();
    dispatch(push(`/${year}/${month}/${day}/${url}`));
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default withRouter(HomeContainer);
