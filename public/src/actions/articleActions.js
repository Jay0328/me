import request from '../utils/api';

/* articles list */
export const RECEIVE_ARTICLES_LIST = 'RECEIVE_ARTICLES_LIST';

const receiveArticlesList = (list, page, totalPage) => ({
  type: RECEIVE_ARTICLES_LIST,
  list,
  page,
  totalPage
});

const fetchArticlesList = page => dispatch => request(`/api/articles/page/${page}`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
  .then(({ articles, totalPage }) => dispatch(receiveArticlesList(articles, page, totalPage)));

const shouldFetchArticlesList = (state, page) => state.getIn(['articlesList', 'page']) !== page;

export const fetchArticlesListIfNeed = page => (dispatch, getState) => {
  if (shouldFetchArticlesList(getState(), page)) {
    return dispatch(fetchArticlesList(page));
  }
  return { type: null };
};

/* single article */
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const CLEAR_ARTICLE_CONTENT = 'CLEAR_ARTICLE_CONTENT';

const receiveArticle = (year, month, day, title, url, content) => ({
  type: RECEIVE_ARTICLE,
  date: `${year}-${month}-${day}`,
  title,
  url,
  content
});

const clearArticleContent = () => ({
  type: CLEAR_ARTICLE_CONTENT
});

const fetchArticle = (year, month, day, url) => dispatch =>
  request(`/api/articles/article?year=${year}&month=${month}&day=${day}&url=${url}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(({ title, content }) => dispatch(receiveArticle(year, month, day, title, url, content)))
    .catch(({ err }) => dispatch(receiveArticle(year, month, day, '', url, err)));

const shouldFetchArticle = (state, year, month, day, url) => {
  if (`${year}-${month}-${day}` !== state.getIn(['article', 'date'])
    || url !== state.getIn(['article', 'url'])
    || !state.getIn(['article', 'content'])) return true;
  return false;
};

export const fetchArticleIfNeed = (year, month, day, url) => (dispatch, getState) => {
  if (shouldFetchArticle(getState(), year, month, day, url)) {
    dispatch(clearArticleContent());
    return dispatch(fetchArticle(year, month, day, url));
  }
  return { type: null };
};
