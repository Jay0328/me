import { push } from 'react-router-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/catch';
import ajax from '../utils/api';
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
  [VERIFY_AUTH]: (render) => ({ render, token: localStorage.getItem('token') })
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
          return await ajax.post('/api/authenticate', {
            headers: { 'Content-Type': 'application/json' },
            body
          });
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
    .switchMap(({ payload: { render, token } }) => {
      if (!token) {
        render();
        return Observable.empty();
      }
      return Observable
        .defer(async () =>
          await ajax.get('/api/authenticate', { headers: { 'Authorization': `Bearer ${token}` } })
        )
        .mergeMap(() =>
          Observable.concat(
            Observable.of(loginSuccess(token)),
            Observable
              .of(null)
              .do(render)
              .mergeMapTo(Observable.empty())
          )
        )
        .catch((err) => {
          console.error(err);
          return Observable.of(logout());
        });
    });
