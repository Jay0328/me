import { fromJS, List } from 'immutable';
import { RECEIVE_ARTICLES_LIST } from '../actions/articleActions';

const initialState = fromJS({
  list: [],
  page: 0,
  totalPage: 0
});

const ArticlesList = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES_LIST:
      return state.set('list', List(action.list))
        .set('page', action.page).set('totalPage', action.totalPage);
    default:
      return state;
  }
};

export default ArticlesList;
