import 'whatwg-fetch';

const parseJSON = res => {
  return new Promise(resolve => res.json()
    .then(json => resolve({
      status: res.status,
      ok: res.ok,
      json,
    })));
};

const fetchRequest = (url, options) => new Promise((resolve, reject) => {
  fetch(url, options)
    .then(parseJSON)
    .then(res => {
      if (res.ok) return resolve(res.json);
      return reject(res.json);
    })
    .catch(error => reject(error));
});

const request = (url, options) => fetchRequest(url, options);

export default request;
