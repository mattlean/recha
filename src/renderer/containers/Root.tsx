import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import TodoListApp from '../components/TodoListApp'
import { State, Actions } from '../types'

const Root = ({ store }: { store: Store<State, Actions> }): ReturnType<typeof Root> => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={TodoListApp} />
    </Router>
  </Provider>
)

export default hot(module)(Root)
