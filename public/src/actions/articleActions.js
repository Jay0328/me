import request from '../utils/api';

export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

const receiveArticle = (year, month, day, title, content) => ({
  type: RECEIVE_ARTICLE,
  date: `${year}-${month}-${day}`,
  title,
  content
});

const fetchArticle = (year, month, day, title) => dispatch =>
  request(`/api/articles/article?year=${year}&month=${month}&day=${day}&title=${title}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(({ content }) => dispatch(receiveArticle(year, month, day, title, content)))
    .catch(({ err }) => dispatch(receiveArticle(year, month, day, title, err)));

const shouldFetchArticle = (state, year, month, day, title) => {
  if (`${year}-${month}-${day}` !== state.getIn(['article', 'date'])
    || title !== state.getIn(['article', 'title'])
    || state.getIn(['article', 'content'])) return true;
  return false;
};

export const fetchArticleIfNeed = (year, month, day, title) => (dispatch, getState) => {
  if (shouldFetchArticle(getState(), year, month, day, title)) {
    return dispatch(fetchArticle(year, month, day, title));
  }
  return { type: null };
};
