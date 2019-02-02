import React from 'react'

import AddTodo from '../containers/AddTodo'
import Footer from './Footer'
import Page from './Page'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = (): ReturnType<typeof App> => (
  <Page>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Page>
)

export default App
