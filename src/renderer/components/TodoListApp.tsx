import Card from '@material/react-card'
import React from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'

import Page from './Page'
import TodoDetails from '../containers/TodoDetails'
import TodoList from '../containers/TodoList'

const TodoListApp = (): JSX.Element => (
  <Page>
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
  </Page>
)

export default TodoListApp
