import 'whatwg-fetch';

const parseResponse = async res => {
  const resType = res.headers.get('Content-Type');
  const result = {
    status: res.status,
    ok: res.status >= 200 && res.status < 300
  };
  let bodyHandler = '';
  if (resType.includes('text')) {
    bodyHandler = 'text';
  }
  else if (resType.includes('json')) {
    bodyHandler = 'json';
  }
  else {
    bodyHandler = 'blob';
  }

  try {
    if (!bodyHandler) {
      return result;
    }
    const body = await res[bodyHandler]();
    return { ...result, body };
  }
  catch (e) {
    throw e;
  }
};

const request = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const result = await parseResponse(response);
    if (result.ok) {
      return result;
    }
    throw result;
  }
  catch (e) {
    throw e;
  }
};

export default request;
