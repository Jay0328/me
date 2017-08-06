import { fromJS } from 'immutable';
import { RECEIVE_ARTICLE, CLEAR_ARTICLE_CONTENT } from '../actions/articleActions';

const initialState = fromJS({
  date: '',
  title: '',
  content: '',
});

const Article = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      const { date, title, content } = action;
      return state.set('date', date).set('title', title)
        .set('content', content);
    case CLEAR_ARTICLE_CONTENT:
      return state.set('content', '');
    default:
      return state;
  }
};

export default Article;
