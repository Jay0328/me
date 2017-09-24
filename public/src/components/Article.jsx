import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Profile from './Profile';
import Markdown from './Markdown';

class Article extends React.Component {
  constructor(props) {
    super(props);
    const { year, month, day, url } = this.props.match.params;
    this.props.fetchArticle(year, month, day, url);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    const { date, title, tags, content } = this.props;
    document.title = `${`${title} | `}Taku's blog`;

    return (
      <section className="article">
        <Header
          mode="article"
          date={date}
          title={title}
          tags={tags}
        />
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
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  content: PropTypes.string.isRequired,
  fetchArticle: PropTypes.func.isRequired
};

export default Article;
