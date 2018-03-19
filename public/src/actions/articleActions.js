import request from '../utils/api';

/* articles list */
export const RECEIVE_ARTICLES_LIST = 'RECEIVE_ARTICLES_LIST';

const receiveArticlesList = (list, page, totalPage) => ({
  type: RECEIVE_ARTICLES_LIST,
  list,
  page,
  totalPage
});

const fetchArticlesList = page => async dispatch => {
  try {
    const { articles, totalPage } = await request(`/api/articles/page/${page}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(receiveArticlesList(articles, page, totalPage));
  }
  catch ({ err }) {
    throw err;
  }
};

const shouldFetchArticlesList = (state, page) => state.getIn(['articlesList', 'page']) !== page;

export const fetchArticlesListIfNeed = page => (dispatch, getState) => {
  if (shouldFetchArticlesList(getState(), page)) dispatch(fetchArticlesList(page));
  return { type: null };
};

/* single article */
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

const receiveArticle = (year, month, day, title, url, tags, content) => ({
  type: RECEIVE_ARTICLE,
  date: `${year}-${month}-${day}`,
  title,
  url,
  tags,
  content
});

const fetchArticle = (year, month, day, url) => async dispatch => {
  try {
    const { title, tags, content } = await request(
      `/api/articles/article?year=${year}&month=${month}&day=${day}&url=${url}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );
    dispatch(receiveArticle(year, month, day, title, url, tags, content));
  }
  catch ({ err }) {
    dispatch(receiveArticle(year, month, day, '', url, err));
    throw err;
  }
};

const shouldFetchArticle = (state, year, month, day, url) => {
  if (`${year}-${month}-${day}` !== state.getIn(['article', 'date'])
    || url !== state.getIn(['article', 'url'])
    || !state.getIn(['article', 'content'])) return true;
  return false;
};

export const fetchArticleIfNeed = (year, month, day, url) => (dispatch, getState) => {
  if (shouldFetchArticle(getState(), year, month, day, url)) {
    dispatch(fetchArticle(year, month, day, url));
  }
  return { type: null };
};
