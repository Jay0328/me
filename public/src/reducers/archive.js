import { fromJS, Map } from 'immutable';
import { RECEIVE_ARCHIVE } from '../actions/archiveActions';

const initialState = fromJS({
  archive: {},
  totalArticlesCount: 0
});

const Archive = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARCHIVE:
      const { archive, totalArticlesCount } = action;
      return state.set('archive', Map(archive))
        .set('totalArticlesCount', parseInt(totalArticlesCount, 10));
    default:
      return state;
  }
};

export default Archive;
