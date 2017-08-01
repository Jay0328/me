import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

class Article extends React.Component {
  constructor(props) {
    super(props);
    const { year, month, day, title } = this.props.match.params;
    this.props.fetchArticle(year, month, day, title);
  }
  render() {
    const { content } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: md.render(content)
        }}
      ></div>
    );
  }
}

Article.propTypes = {
  match: PropTypes.shape().isRequired,
  content: PropTypes.string.isRequired,
  fetchArticle: PropTypes.func.isRequired
};

Article.defaultProps = {
};

export default Article;
