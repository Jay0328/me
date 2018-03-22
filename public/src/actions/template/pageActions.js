import request from '../../utils/api';

const receiveData = (type, data, params) => ({
  type,
  ...data,
  ...params
});

const fetchData = (type, url, keys, params) => async dispatch => {
  try {
    const response = await request(typeof url === 'function' ? url(params) : url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = keys.reduce((acc, key) => {
      acc[key] = response[key];
      return acc;
    }, {});
    dispatch(receiveData(type, data, params));
  }
  catch ({ err }) {
    throw err;
  }
};

const pageActions = (type, url, keys, shouldFetchData) => params => async (dispatch, getState) => {
  try {
    if (shouldFetchData(getState(), params)) {
      await dispatch(fetchData(type, url, keys, params));
    }
  }
  catch (err) {
    throw err;
  }
};

export default pageActions;
