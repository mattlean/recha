/* eslint-disable import/prefer-default-export */
import { applyMiddleware, compose, createStore } from 'redux'

export const setupStore = (
  reducer,
  preloadedState,
  middlewares = [],
  devMiddlewares
): ReturnType<typeof setupStore> => {
  let m = middlewares || []

  if (process.env.NODE_ENV === 'development' && Array.isArray(devMiddlewares)) {
    m = [...m, ...devMiddlewares]
  }

  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  if (preloadedState !== undefined) {
    return createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
  }
  return createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)))
}
