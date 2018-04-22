import 'whatwg-fetch';

const parseResponse = res => new Promise(resolve => {
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

  if (!bodyHandler) {
    resolve({ ...result });
  }
  else {
    res[bodyHandler]().then(body => resolve({ ...result, body }));
  }
});

const request = (url, options) => new Promise((resolve, reject) => {
  fetch(url, options)
    .then(parseResponse)
    .then(res => {
      if (res.ok) return resolve(res);
      return reject(res);
    })
    .catch(error => reject(error));
});

export default request;
