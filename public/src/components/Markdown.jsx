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

const Markdown = ({ className, content }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{
      __html: md.render(content)
    }}
  ></div>
);

Markdown.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Markdown.defaultProps = {
};

export default Markdown;
