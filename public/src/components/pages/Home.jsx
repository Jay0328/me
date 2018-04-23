import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import RoutePage from '../hoc/RoutePage';
import ConnectWithToJS from '../hoc/ConnectWithToJS';
import ArticlePreview from '../ArticlePreview';
import Pagination from '../Pagination';
import Profile from '../Profile';
import { fetchArticlesListIfNeed } from '../../actions/articleActions';
import { md } from '../theme/rwd';

const styles = {
  home: {
    display: 'flex'
  },
  list: {
    width: '100%',
    [`@media (min-width: ${md}px)`]: {
      marginRight: '50px'
    }
  }
};

const mapStateToProps = state => ({
  articlesList: state.getIn(['articlesList', 'articles']),
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

@withRouter
@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@RoutePage({
  shouldRefetchData: (props, nextProps) => props.match.params.page !== nextProps.match.params.page
})
@injectSheet(styles)
class Home extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    articlesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    page: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired
  }

  render() {
    const { classes, articlesList, page, totalPage } = this.props;
    return (
      <main className={classes.home}>
        <section className={classes.list}>
          {articlesList.map(article => (
            <ArticlePreview
              key={`${article.year}-${article.month}-${article.day}-${article.url}`}
              {...article}
            />
          ))}
          <Pagination baseUrl='/' page={page} totalPage={totalPage} />
        </section>
        <Profile />
      </main>
    );
  }
}

export default Home;
