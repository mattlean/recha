import React from 'react'

import Content from './Content'
import Sidebar from './Sidebar'

const TodoListPage = ({ children }): JSX.Element => (
  <>
    <Sidebar />
    <Content>{children}</Content>
  </>
)

export default TodoListPage
