import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { Map } from 'immutable';
import reducers from '../reducers';

const initialState = Map();

const create = history => {
  const isProduction = process.env.NODE_ENV === 'production';
  const composeEnhancers = (!isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;
  const middleware = [routerMiddleware(history), reduxThunk];
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default create;
