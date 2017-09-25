import request from '../utils/api';

export const RECEIVE_ARCHIVES = 'RECEIVE_ARCHIVES';

const receiveArchives = (archives, totalArticlesCount) => ({
  type: RECEIVE_ARCHIVES,
  archives,
  totalArticlesCount
});

const fetchArchives = () => async dispatch => {
  try {
    const { archives, totalArticlesCount } = await request('/api/archives', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(receiveArchives(archives, totalArticlesCount));
  }
  catch ({ err }) {
    throw err;
  }
};

const shouldFetchArchives = state => state.getIn(['archives', 'archives']).isEmpty();

export const fetchArchivesIfNeed = () => (dispatch, getState) => {
  if (shouldFetchArchives(getState())) dispatch(fetchArchives());
  return { type: null };
};
