import request from '../utils/api';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';

const receiveTags = tags => ({
  type: RECEIVE_TAGS,
  tags
});

const fetchTags = () => dispatch => request('/api/tags', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
  .then(({ tags }) => dispatch(receiveTags(tags)));

const shouldFetchTags = state => state.get('tags').isEmpty();

export const fetchTagsIfNeed = () => (dispatch, getState) => {
  if (shouldFetchTags(getState())) {
    return dispatch(fetchTags());
  }
  return { type: null };
};
