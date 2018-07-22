import { push } from 'react-router-redux';
import ajax from 'Utils/api';
import { createActions, createActionTypes } from 'Utils/redux';

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

const getLoginFormData = (state) => {
  const username = state.getIn(['login', 'username', 'value']);
  const password1 = state.getIn(['login', 'password1', 'value']);
  const password2 = state.getIn(['login', 'password2', 'value']);
  return { username, password1, password2 };
};

export const loginEpic = (action$, state$, {
  ofType$,
  of$,
  from$,
  defer$,
  map$,
  switchMap$,
  catch$
}) =>
  action$.pipe(
    ofType$(LOGIN),
    map$(() => getLoginFormData(state$.value)),
    switchMap$(data =>
      defer$(async () => {
        await check(data);
        const body = JSON.stringify(data);
        return await ajax.post('/api/authenticate', {
          headers: { 'Content-Type': 'application/json' },
          body
        });
      }).pipe(
        switchMap$(token =>
          of$(
            pristineLoginForm(),
            loginSuccess(token),
            push('/')
          )
        ),
        catch$(({ message }) =>
          from$(message.map(({ field, errMsg }) => loginFail(field, errMsg)))
        )
      )
    )
  );

export const verifyAuthEpic = (action$, state$, {
  ofType$,
  empty$,
  defer$,
  concat$,
  of$,
  tap$,
  switchMap$,
  mergeMap$,
  mergeMapTo$,
  catch$
}) =>
  action$.pipe(
    ofType$(VERIFY_AUTH),
    switchMap$(({ payload: { render, token } }) => {
      if (!token) {
        render();
        return empty$();
      }
      return defer$(async () =>
        await ajax.get('/api/authenticate', { headers: { Authorization: `Bearer ${token}` } })
      ).pipe(
        mergeMap$(() =>
          concat$(
            of$(loginSuccess(token)),
            of$(null).pipe(
              tap$(render),
              mergeMapTo$(empty$())
            )
          )
        ),
        catch$((err) => {
          console.error(err);
          return of$(logout());
        })
      );
    })
  );
