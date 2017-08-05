//  react
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
//  css
import 'normalize.css/normalize.css';
import 'highlight.js/styles/github.css';
import '../assets/css/index.scss';
//  components & containers
import {
  AppContainer,
  HomeContainer,
  LoginContainer,
  ArticleContainer
} from './containers';
//  redux
import creatStore from './store';
import { verifyAuth } from './actions/authActions';

const history = createBrowserHistory();
const store = creatStore(history);

const renderDom = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Route exact strict path='/' component={HomeContainer} />
          <Route exact strict path='/page/:page' component={HomeContainer} />
          <Route exact strict path='/login' component={LoginContainer} />
          <Route exact strict path='/:year/:month/:day/:title' component={ArticleContainer} />
        </AppContainer>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

store.dispatch(verifyAuth()).then(renderDom);
