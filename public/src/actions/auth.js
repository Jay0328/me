import { push } from 'react-router-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import request from '../utils/api';
import { createActions, createActionTypes } from '../utils/redux';

export const {
  PRISTINE_LOGIN_FORM,
  LOGIN_ON_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN,
  LOGOUT,
  VERIFY_AUTH
} = createActionTypes([
  'PRISTINE_LOGIN_FORM',
  'LOGIN_ON_CHANGE',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
  'LOGIN',
  'LOGOUT',
  'VERIFY_AUTH',
]);

export const {
  pristineLoginForm,
  loginSuccess,
  loginFail,
  loginOnChange,
  login,
  logout,
  verifyAuth
} = createActions({
  [[
    PRISTINE_LOGIN_FORM,
    LOGIN
  ]]: null,
  [LOGIN_SUCCESS]: (token) => {
    localStorage.setItem('token', token);
    return token;
  },
  [LOGIN_FAIL]: (field, errMsg) => ({ field, errMsg }),
  [LOGIN_ON_CHANGE]: (field, value) => ({ field, value }),
  [LOGOUT]: () => localStorage.removeItem('token'),
  [VERIFY_AUTH]: () => localStorage.getItem('token')
});

const check = async data => {
  const pattern = /^[A-Za-z0-9]{4,16}$/;
  try {
    const message = Object.entries(data)
      .reduce((ret, [field, value]) => {
        if (!pattern.test(value) || !value) {
          ret.push({
            field,
            errMsg: '4~16英文或數字'
          });
        }
        return ret;
      }, []);
    if (message.length) {
      const err = { message };
      throw err;
    }
  }
  catch (err) {
    throw err;
  }
};

const getLoginFormData = (store) => {
  const state = store.getState();
  const username = state.getIn(['login', 'username', 'value']);
  const password1 = state.getIn(['login', 'password1', 'value']);
  const password2 = state.getIn(['login', 'password2', 'value']);
  return { username, password1, password2 };
};

export const loginEpic = (action$, store) =>
  action$
    .ofType(LOGIN)
    .map(() => getLoginFormData(store))
    .switchMap(data =>
      Observable
        .defer(async () => {
          await check(data);
          const body = JSON.stringify(data);
          const { body: { token } } = await request('/api/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
          });
          return token;
        })
        .switchMap(token =>
          Observable
            .of(
              pristineLoginForm(),
              loginSuccess(token),
              push('/')
            )
        )
        .catch(({ message }) =>
          Observable
            .from(message.map(({ field, errMsg }) => loginFail(field, errMsg)))
        )
    );

export const verifyAuthEpic = action$ =>
  action$
    .ofType(VERIFY_AUTH)
    .map(({ payload }) => payload)
    .filter(token => token)
    .switchMap(token =>
      Observable
        .defer(async () => {
          await request('/api/authenticate', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return token;
        })
        .map(loginSuccess)
        .catch((err) => {
          console.error(err);
          return Observable.of(logout());
        })
    );