import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers';

const configureStore = (preloadedState) => {
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk),
    compose(
      ...enhancers
    )
  );
};

export default configureStore;
