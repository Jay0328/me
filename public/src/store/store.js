import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import reducers from '../reducers';

const initialState = Immutable.Map();

const create = (history) => {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      reduxThunk,
      createLogger({ stateTransformer: state => state.toJS() })
    )
  );
};

export default create;
