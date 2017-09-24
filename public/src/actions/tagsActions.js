import request from '../utils/api';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';

const receiveTags = tags => ({
  type: RECEIVE_TAGS,
  tags
});

const fetchTags = () => async dispatch => {
  try {
    const { tags } = await request('/api/tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(receiveTags(tags));
  }
  catch ({ err }) {
    throw err;
  }
};
const shouldFetchTags = state => state.get('tags').isEmpty();

export const fetchTagsIfNeed = () => (dispatch, getState) => {
  if (shouldFetchTags(getState())) dispatch(fetchTags());
  return { type: null };
};
