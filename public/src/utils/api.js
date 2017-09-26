import 'whatwg-fetch';

const parseJSON = res => new Promise(resolve => res.json()
  .then(json => resolve({
    status: res.status,
    ok: res.status >= 200 && res.status < 300,
    json,
  })));

const request = (url, options) => new Promise((resolve, reject) => {
  fetch(url, options)
    .then(parseJSON)
    .then(res => {
      if (res.ok) return resolve(res.json);
      return reject(res.json);
    })
    .catch(error => reject(error));
});

export default request;
