import pageActions from './template/pageActions';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const fetchCategoriesIfNeed = pageActions(
  RECEIVE_CATEGORIES,
  '/api/categories',
  ['categories'],
  state => state.getIn(['categories', 'categories']).isEmpty()
);
