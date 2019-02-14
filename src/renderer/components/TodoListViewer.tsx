import Card from '@material/react-card'
import React from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'

import TodoListPage from './TodoListPage'
import TodoDetails from '../containers/TodoDetails'
import TodoList from '../containers/TodoList'

const TodoListViewer = (): JSX.Element => (
  <TodoListPage>
    <Grid>
      <Row>
        <Cell columns={5}>
          <Card id="todo-list" className="card-content">
            <TodoList />
          </Card>
        </Cell>
        <Cell columns={7}>
          <TodoDetails />
        </Cell>
      </Row>
    </Grid>
  </TodoListPage>
)

export default TodoListViewer
