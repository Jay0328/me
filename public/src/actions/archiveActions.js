import request from '../utils/api';

export const RECEIVE_ARCHIVE = 'RECEIVE_ARCHIVE';

const receiveArchive = (archive, totalArticlesCount) => ({
  type: RECEIVE_ARCHIVE,
  archive,
  totalArticlesCount
});

const fetchArchive = () => dispatch => request('/api/articles/archive', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
  .then(({ archive, totalArticlesCount }) => dispatch(receiveArchive(archive, totalArticlesCount)));

const shouldFetchArchive = state => state.getIn(['archive', 'archive']).isEmpty();

export const fetchArchiveIfNeed = () => (dispatch, getState) => {
  if (shouldFetchArchive(getState())) {
    return dispatch(fetchArchive());
  }
  return { type: null };
};
