import { Map, List } from 'immutable';
import { RECEIVE_TAGS } from '../actions/tagsActions';

const initialState = Map();

const Tags = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TAGS:
      const newState = action.tags.reduce((st, tag) => {
        return st.set(tag.tagName, List(tag.articles));
      }, initialState);
      return newState;
    default:
      return state;
  }
};

export default Tags;
