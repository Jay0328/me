import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ArticlePreview from './ArticlePreview';
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
    const { articlesList, page, totalPage } = this.props;

    const list = (
      <div className="list">
        {articlesList.map(article => {
          const { year, month, day, title, url, tags, preview } = article;
          return (
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
          );
        })}
      </div>
    );

    return (
      <section className="home">
        <Header />
        <div className="container">
          <div className="articles-list">
            {list}
            <Pagination baseUrl='/' page={page} totalPage={totalPage} />
          </div>
          <Profile />
        </div>
      </section>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape().isRequired,
  fetchArticlesList: PropTypes.func.isRequired,
  articlesList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

Home.defaultProps = {
};

export default Home;
