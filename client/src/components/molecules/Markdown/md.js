import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/highlight';
import { markdownLanguage } from 'Config';

/*  eslint import/no-dynamic-require: 0 */
/*  eslint global-require: 0  */
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

export default md;
