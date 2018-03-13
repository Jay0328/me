import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import injectSheet from 'react-jss';
import RoutePage from './hoc/RoutePage';
import ArticlePreview from './ArticlePreview';
import Pagination from './Pagination';
import { fetchArticlesListIfNeed } from '../actions/articleActions';

const styles = {
  list: {
  }
};

const Home = ({ articlesList, page, totalPage }) => (
  <main className="container">
    <section className="list">
      {articlesList.map(({ year, month, day, title, url, tags, preview }) => (
        <ArticlePreview
          key={`${year}-${month}-${day}-${url}`}
          year={year}
          month={month}
          day={day}
          title={title}
          url={url}
          tags={tags}
          preview={preview}
        />
      ))}
    </section>
    <Pagination baseUrl='/' page={page} totalPage={totalPage} />
  </main>
);

Home.propTypes = {
  articlesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

const HomePage = RoutePage(
  injectSheet(styles)(Home),
  (props, nextProps) => props.match.params.page !== nextProps.match.params.page
);

const mapStateToProps = state => ({
  articlesList: state.getIn(['articlesList', 'list']).toArray(),
  page: state.getIn(['articlesList', 'page']),
  totalPage: state.getIn(['articlesList', 'totalPage'])
});

const mapDispatchToProps = dispatch => ({
  fetchData(props) {
    let { page } = props.match.params;
    page = page ? page | 0 : 1;
    dispatch(fetchArticlesListIfNeed(page));
  }
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default withRouter(HomeContainer);
