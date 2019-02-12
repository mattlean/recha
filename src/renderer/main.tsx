import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'

import Root from './containers/Root'
import rootReducer from './reducers/index2'
import { setupStore } from './util/store'
import './main.scss'

const root = document.getElementById('root')

const store = setupStore(rootReducer, undefined, [thunk])

if (root) {
  render(<Root store={store} />, root)
}
