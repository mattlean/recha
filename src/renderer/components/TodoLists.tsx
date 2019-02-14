import Card from '@material/react-card'
import List, { ListItem, ListItemText } from '@material/react-list'
import React from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'

import TodoListPage from './TodoListPage'
import Todo from '../types/Todo'

const TodoLists = ({ todoLists = [] }: { todoLists: Todo[] }): JSX.Element => {
  let content
  if (todoLists.length > 0) {
    content = todoLists.map(todoList => (
      <List>
        <ListItem>
          <ListItemText primaryText="Todo List" />
        </ListItem>
      </List>
    ))
  }
  content = <div>No todo lists</div>

  return (
    <TodoListPage>
      <Grid>
        <Row>
          <Cell columns={12}>
            <Card id="todo-list" className="card-content">
              {content}
            </Card>
          </Cell>
        </Row>
      </Grid>
    </TodoListPage>
  )
}

export default TodoLists
