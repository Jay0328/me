import { List } from 'immutable';
import { RECEIVE_TAGS } from '../actions/tagsActions';

const initialState = List();

const Tags = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TAGS:
      return List(action.tags);
    default:
      return state;
  }
};

export default Tags;
