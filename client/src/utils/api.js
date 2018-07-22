import 'whatwg-fetch';

const getBodyHandler = (resType) => {
  if (resType.includes('text')) {
    return 'text';
  }
  else if (resType.includes('json')) {
    return 'json';
  }
  return 'blob';
};

const parseResponse = async res => {
  const resType = res.headers.get('Content-Type');
  const result = {
    status: res.status,
    ok: res.status >= 200 && res.status < 300
  };
  const bodyHandler = getBodyHandler(resType);
  try {
    const body = await res[bodyHandler]();
    return { ...result, body };
  }
  catch (e) {
    throw e;
  }
};

const request = (method) => async (url, options) => {
  try {
    const response = await fetch(url, { method, ...options });
    const result = await parseResponse(response);
    if (result.ok) {
      return result.body;
    }
    const err = new Error(result.body.message);
    err.status = result.status;
    throw err;
  }
  catch (err) {
    throw err;
  }
};

const ajax = {
  get: request('GET'),
  post: request('POST')
};

export default ajax;
