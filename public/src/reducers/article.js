import { fromJS } from 'immutable';
import { RECEIVE_ARTICLE } from '../actions/articleActions';

const initialState = fromJS({
  date: '',
  title: '',
  content: '',
});

const Article = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      const { year, month, day, title, content } = action;
      return state.set('date', `${year}-${month}-${day}`).set('title', title)
        .set('content', content);
    default:
      return state;
  }
};

export default Article;
