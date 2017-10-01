import { fromJS, List } from 'immutable';
import { RECEIVE_CATEGORIES } from '../actions/categoriesActions';

const initialState = fromJS({
  categories: [],
  category: {
    categoryName: '',
    articles: []
  }
});

const Categories = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return state.set('categories', List(action.categories));
    default:
      return state;
  }
};

export default Categories;
