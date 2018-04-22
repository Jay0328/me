import pageActions from './template/pageActions';

/* articles list */
export const RECEIVE_ARTICLES_LIST = 'RECEIVE_ARTICLES_LIST';

export const fetchArticlesListIfNeed = pageActions(
  RECEIVE_ARTICLES_LIST,
  ({ page }) => `/api/articles?page=${page}`,
  ['articles', 'totalPage'],
  (state, { page }) => state.getIn(['articlesList', 'page']) !== page
);

/* single article */
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

export const fetchArticleIfNeed = pageActions(
  RECEIVE_ARTICLE,
  ({ year, month, day, url }) => `/api/articles/article?year=${year}&month=${month}&day=${day}&url=${url}`,
  ['title', 'tags', 'content'],
  (state, { year, month, day, url }) => {
    if (`${year}-${month}-${day}` !== state.getIn(['article', 'date'])
      || url !== state.getIn(['article', 'url'])
      || !state.getIn(['article', 'content'])) return true;
    return false;
  }
);
