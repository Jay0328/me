import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Profile from './Profile';
import Markdown from './Markdown';

class Article extends React.PureComponent {
  constructor(props) {
    super(props);
    const { year, month, day, url } = this.props.match.params;
    this.props.fetchArticle(year, month, day, url);
  }
  render() {
    const { content } = this.props;
    return (
      <section className="article">
        <Header />
        <div className="container">
          <Profile />
          <Markdown className="article-content" content={content} />
        </div>
      </section>
    );
  }
}

Article.propTypes = {
  match: PropTypes.shape().isRequired,
  content: PropTypes.string.isRequired,
  fetchArticle: PropTypes.func.isRequired
};

export default Article;
