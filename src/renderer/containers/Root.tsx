import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import App from '../components/App'
import { State, Actions } from '../types'

const Root = ({ store }: { store: Store<State, Actions> }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
)

export default hot(module)(Root)
