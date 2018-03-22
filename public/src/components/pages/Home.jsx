import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RoutePage from '../hoc/RoutePage';
import ArticlePreview from '../ArticlePreview';
import Pagination from '../Pagination';
import { fetchArticlesListIfNeed } from '../../actions/articleActions';

const Home = ({ articlesList, page, totalPage }) => (
  <main>
    {articlesList.map(article => (
      <ArticlePreview
        key={`${article.year}-${article.month}-${article.day}-${article.url}`}
        {...article}
      />
    ))}
    <Pagination baseUrl='/' page={page} totalPage={totalPage} />
  </main>
);

Home.propTypes = {
  articlesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

const HomePage = RoutePage(
  Home,
  (props, nextProps) => props.match.params.page !== nextProps.match.params.page
);

const mapStateToProps = state => ({
  articlesList: state.getIn(['articlesList', 'articles']).toArray(),
  page: state.getIn(['articlesList', 'page']),
  totalPage: state.getIn(['articlesList', 'totalPage'])
});

const mapDispatchToProps = dispatch => ({
  fetchData(props) {
    let { page } = props.match.params;
    page = page ? page | 0 : 1;
    dispatch(fetchArticlesListIfNeed({ page }));
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default withRouter(HomeContainer);
