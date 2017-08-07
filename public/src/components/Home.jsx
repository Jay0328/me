import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import Profile from './Profile';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const page = this.props.match.params.page ? parseInt(this.props.match.params.page, 10) : 1;
    this.props.fetchArticlesList(page);
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this.props.fetchArticlesList(parseInt(nextProps.match.params.page, 10));
    }
  }

  render() {
    const { articlesList, articleOnClick, page, totalPage } = this.props;
    return (
      <section className="home">
        <div className="articles-list">
          <div className="articles">
            {articlesList.map(article => {
              const { year, month, day, title } = article;
              return (
                <div onClick={articleOnClick(year, month, day, title)} key={`${year}-${month}-${day}-${title}`}>
                  {year}-{month}-{day} : {title}
                </div>
              );
            })}
          </div>
          <Pagination baseUrl='/' page={page} totalPage={totalPage} />
        </div>
        <Profile />
      </section>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape().isRequired,
  fetchArticlesList: PropTypes.func.isRequired,
  articleOnClick: PropTypes.func.isRequired,
  articlesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

Home.defaultProps = {
};

export default Home;
