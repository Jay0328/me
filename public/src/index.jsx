//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
//  css
import 'normalize.css/normalize.css';
import '../assets/css/index.scss';
//  components & containers
import {
  AppContainer,
  HomeContainer,
  LoginContainer,
} from './containers';
//  redux
import creatStore from './store';
import { verifyAuth } from './actions/authActions';

const history = createHistory();
const store = creatStore(history);

store.dispatch(verifyAuth());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <Route exact path='/' component={HomeContainer} />
        <Route exact path='/login' component={LoginContainer} />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
