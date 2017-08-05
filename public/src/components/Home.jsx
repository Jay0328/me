import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const page = this.props.match.params.page ? parseInt(this.props.match.params.page, 10) : 1;
    this.props.fetchArticlesList(page);

    this.renderPageMenu = this.renderPageMenu.bind(this);
  }

  renderPageMenu() {
    const { page, totalPage } = this.props;
    if (totalPage <= 5) {
      return null;
    }
    console.log([...Array(totalPage).keys()], page, totalPage);
    return <div>qwer</div>;
  }

  render() {
    const { articlesList, articleOnClick } = this.props;
    return (
      <div>
        <div>
          {articlesList.map(article => {
            const { year, month, day, title } = article;
            return (
              <div onClick={articleOnClick(year, month, day, title)} key={`${year}-${month}-${day}-${title}`}>
                {year}-{month}-{day} : {title}
              </div>
            );
          })}
        </div>
        <div>
          {this.renderPageMenu()}
        </div>
      </div>
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
