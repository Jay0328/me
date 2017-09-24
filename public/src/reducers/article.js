import { fromJS, List } from 'immutable';
import { RECEIVE_ARTICLE } from '../actions/articleActions';

const initialState = fromJS({
  date: '',
  title: '',
  url: '',
  tags: [],
  content: '',
});

const Article = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      const { date, title, url, tags, content } = action;
      return state.set('date', date).set('title', title)
        .set('url', url).set('tags', List(tags))
        .set('content', content);
    default:
      return state;
  }
};

export default Article;
