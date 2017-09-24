import request from '../utils/api';

export const RECEIVE_ARCHIVE = 'RECEIVE_ARCHIVE';

const receiveArchive = (archive, totalArticlesCount) => ({
  type: RECEIVE_ARCHIVE,
  archive,
  totalArticlesCount
});

const fetchArchive = () => async dispatch => {
  try {
    const { archive, totalArticlesCount } = await request('/api/archives', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(receiveArchive(archive, totalArticlesCount));
  }
  catch ({ err }) {
    throw err;
  }
};

const shouldFetchArchive = state => state.getIn(['archive', 'archive']).isEmpty();

export const fetchArchiveIfNeed = () => (dispatch, getState) => {
  if (shouldFetchArchive(getState())) dispatch(fetchArchive());
  return { type: null };
};
