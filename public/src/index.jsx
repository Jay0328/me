//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
//  css
import 'normalize.css/normalize.css';
//  components & containers
import AppContainer from './containers';
//  redux
import creatStore from './store';

const history = createHistory();
const store = creatStore(history);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
