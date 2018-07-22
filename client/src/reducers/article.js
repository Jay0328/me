import { fromJS } from 'immutable';
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
      /*  eslint no-case-declarations: 0  */
      const {
        year,
        month,
        day,
        title,
        url,
        tags,
        content
      } = action;
      return state
        .set('date', `${year}-${month}-${day}`)
        .set('title', title)
        .set('url', url)
        .set('tags', fromJS(tags))
        .set('content', content);
    default:
      return state;
  }
};

export default Article;
