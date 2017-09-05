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
import App from './components/App';
import {
  HomeContainer,
  TagsContainer,
  LoginContainer,
  ArticleContainer
} from './containers';
//  redux
import creatStore from './store';
import { verifyAuth } from './actions/authActions';

const history = createBrowserHistory();
history.listen(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
const store = creatStore(history);

const renderDom = () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route exact strict path='/' component={HomeContainer} />
          <Route exact strict path='/page/:page' component={HomeContainer} />
          <Route exact strict path='/tags' component={TagsContainer} />
          <Route exact strict path='/tags/:tag' component={TagsContainer} />
          <Route exact strict path='/login' component={LoginContainer} />
          <Route exact strict path='/:year/:month/:day/:url' component={ArticleContainer} />
        </App>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
  );
};

const run = async () => {
  await store.dispatch(verifyAuth());
  renderDom();
  window.onfocus = () => {
    document.title = 'Taku 9487';
  };
  window.onblur = () => {
    document.title = 'QAQ 不要走';
  };
};

run();
