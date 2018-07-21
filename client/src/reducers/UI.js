import { fromJS } from 'immutable';
import { IS_FETCHING_DATA } from '../actions/template/pageActions';

const initialState = fromJS({
  isFetching: false
});

const Tags = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING_DATA:
      return state
        .set('isFetching', action.isFetching);
    default:
      return state;
  }
};

export default Tags;
