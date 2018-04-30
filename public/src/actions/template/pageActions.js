import request from '../../utils/api';

export const IS_FETCHING_DATA = 'IS_FETCHING_DATA';

const isFetchingData = isFetching => ({
  type: IS_FETCHING_DATA,
  isFetching
});

const receiveData = (type, data, params) => ({
  type,
  ...data,
  ...params
});

const fetchData = (type, url, keys, params) => async dispatch => {
  try {
    const { body } = await request(typeof url === 'function' ? url(params) : url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = keys.reduce((acc, key) => {
      acc[key] = body[key];
      return acc;
    }, {});
    dispatch(receiveData(type, data, params));
  }
  catch ({ body: { message } }) {
    throw message;
  }
};

const pageActions = (type, url, keys, shouldFetchData) => params => async (dispatch, getState) => {
  try {
    if (shouldFetchData(getState(), params)) {
      dispatch(isFetchingData(true));
      await dispatch(fetchData(type, url, keys, params));
      setTimeout(() => dispatch(isFetchingData(false)), 1000);
    }
  }
  catch ({ body: { message } }) {
    throw message;
  }
};

export default pageActions;
