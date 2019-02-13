import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import TodoListApp from '../components/TodoListApp'
import TodoLists from '../components/TodoLists'
import { Actions } from '../types/actions'
import { State } from '../types/reducers'

const Root = ({ store }: { store: Store<State, Actions> }): ReturnType<typeof Root> => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/test" component={TodoLists} />
        <Route path="/:date?/:id?" component={TodoListApp} />
      </Switch>
    </Router>
  </Provider>
)

export default hot(module)(Root)
