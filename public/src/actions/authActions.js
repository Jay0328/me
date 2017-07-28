import { goBack } from 'react-router-redux';
import request from '../utils/api';

//	action types
export const PRISTINE_LOGIN_FORM = 'PRISTINE_LOGIN_FORM';
export const PRISTINE_REG_FORM = 'PRISTINE_REG_FORM';
export const LOGIN_ONCHANGE = 'LOGIN_ONCHANGE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

const check = data => new Promise((resolve, reject) => {
  const pattern = /^[A-Za-z0-9]{4,16}$/;
  let rejectReason = [];
  let err = false;
  Object.keys(data).forEach(field => {
    if (!pattern.test(data[field].value) || !data[field].value) {
      err = true;
      rejectReason = [...rejectReason, {
        field,
        errMsg: '4~16英文或數字'
      }];
    }
  });
  if (err) reject({ err: rejectReason });
  else resolve();
});

const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  token
});

const loginFail = (field, errMsg) => ({
  type: LOGIN_FAIL,
  field,
  errMsg
});

export const pristineLoginForm = () => {
  document.getElementById('username').value = '';
  document.getElementById('password1').value = '';
  document.getElementById('password2').value = '';
  return {
    type: PRISTINE_LOGIN_FORM
  };
};

export const loginOnChange = (field, value) => ({
  type: LOGIN_ONCHANGE,
  field,
  value
});

export const login = data => dispatch => check(data)
  .then(request('/api/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }, true))
  .then(({ token }) => {
    localStorage.setItem('token', token);
    dispatch(pristineLoginForm());
    dispatch(loginSuccess(token));
    dispatch(goBack());
  })
  .catch(({ err }) => err.forEach(({ field, errMsg }) => {
    dispatch(loginFail(field, errMsg));
  }));

export const verifyAuth = () => dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    request('/api/authenticate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch(loginSuccess(token));
      });
  }
  return { type: null };
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT
  };
};