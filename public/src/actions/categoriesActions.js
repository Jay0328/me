import pageActions from './template/pageActions';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const fetchCategoriesIfNeed = pageActions(
  RECEIVE_CATEGORIES,
  '/api/categories',
  ['categories'],
  state => state.getIn(['categories', 'categories']).isEmpty()
);

export const RECEIVE_ARTICLES_IN_CATEGORY = 'RECEIVE_ARTICLES_IN_CATEGORY';

export const fetchArticlesInCategory = pageActions(
  RECEIVE_ARTICLES_IN_CATEGORY,
  ({ categoryName }) => `/api/categories/${categoryName}`,
  ['articles'],
  (state, { categoryName }) => !state.getIn(['categories', categoryName])
);
