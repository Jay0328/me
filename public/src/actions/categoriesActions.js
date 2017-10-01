import request from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

const fetchCategories = () => async dispatch => {
  try {
    const { categories } = await request('/api/categories', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(receiveCategories(categories));
  }
  catch ({ err }) {
    throw err;
  }
};
const shouldFetchCategories = state => state.getIn(['categories', 'categories']).isEmpty();

export const fetchCategoriesIfNeed = () => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) dispatch(fetchCategories());
  return { type: null };
};
