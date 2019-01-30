import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'

import Root from './containers/Root'
import todos from './reducers'
import { setupStore } from './util/store'

const root = document.getElementById('root')

const store = setupStore(todos, null, [thunk])

if(root) {
  render(<Root store={store} />, root)
}
