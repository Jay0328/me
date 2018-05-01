import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/highlight';
import { markdownLanguage } from '../../config';
import { themeColor, opacityColor } from './theme/colors';

markdownLanguage.forEach(langName => {
  const langModule = require(`highlight.js/lib/languages/${langName}`);
  hljs.registerLanguage(langName, langModule);
});

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

const styles = {
  markdown: {
    '& a': {
      color: themeColor,
      textDecoration: 'none',
      '&:hover': {
        color: opacityColor(themeColor, 0.8)
      }
    },
    '& blockquote': {
      borderLeft: `4px solid ${themeColor}`,
      margin: '20px 0',
      padding: '0 15px',
      color: '#777',
      '& > :first-child': {
        marginTop: '0'
      },
      '& > :last-child': {
        marginBottom: '0'
      }
    },
    '& code': {
      margin: '0 2px',
      padding: '0 5px',
      whiteSpace: 'nowrap',
      border: '1px solid #eaeaea',
      backgroundColor: '#f8f8f8',
      borderRadius: '3px',
    },
    '& pre': {
      fontSize: '13px',
      lineHeight: '19px',
      overflow: 'auto',
      padding: '6px 10px',
      borderRadius: '3px',
      '& code': {
        margin: '0',
        padding: '0',
        whiteSpace: 'pre',
        border: 'none',
        background: 'transparent'
      }
    },
    '& table': {
      'borderCollapse': 'collapse',
      '& tr': {
        borderTop: '1px solid #cccccc',
        '&:nth-child(2n)': {
          backgroundColor: '#f8f8f8',
        },
        '& th': {
          fontWeight: 'bold'
        },
        '& th, & td': {
          border: '1px solid #cccccc',
          padding: '6px 13px'
        }
      }
    }
  }
};

@injectSheet(styles)
class Markdown extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { classes, className, content } = this.props;
    return (
      <div
        className={`${className} ${classes.markdown}`.trim()}
        dangerouslySetInnerHTML={{
          __html: md.render(content)
        }}
      >
      </div>
    );
  }
}

export default Markdown;
