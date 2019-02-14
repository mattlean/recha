import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import Page from '../components/Page'
import TodoLists from '../components/TodoLists'
import TodoListViewer from '../components/TodoListViewer'
import { Actions } from '../types/actions'
import { State } from '../types/reducers'

const Root = ({ store }: { store: Store<State, Actions> }): JSX.Element => (
  <Page>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/lists" component={TodoLists} />
          <Route path="/:date?/:id?" component={TodoListViewer} />
        </Switch>
      </Router>
    </Provider>
  </Page>
)

export default hot(module)(Root)
