import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import App from '../components/App'

import TodoListApp from '../components/TodoListApp'
import { State, Actions } from '../types'

const Root = ({ store }: { store: Store<State, Actions> }): ReturnType<typeof Root> => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/test" component={App} />
        <Route path="/:date?/:id?" component={TodoListApp} />
      </Switch>
    </Router>
  </Provider>
)

export default hot(module)(Root)
