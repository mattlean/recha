import Card from '@material/react-card'
import List, { ListItem, ListItemText } from '@material/react-list'
import moment from 'moment'
import React, { Component } from 'react'
import { Cell, Grid, Row } from '@material/react-layout-grid'
import { Link } from 'react-router-dom'

import TodoListPage from './TodoListPage'
import { getTodoLists } from '../util/api/todos'

interface State {
  todoLists: string[]
}

class TodoLists extends Component<{}, State> {
  public state = {
    todoLists: []
  }

  public componentDidMount(): void {
    getTodoLists().then(res => {
      this.setState({ todoLists: res.data })
    })
  }

  public render(): JSX.Element {
    const { todoLists } = this.state

    let content
    if (todoLists.length > 0) {
      content = todoLists.map(todoList => {
        const date = moment(todoList).format('YYYY-MM-DD')
        return (
          <Link key={todoList} to={`/${date}`}>
            <List>
              <ListItem>
                <ListItemText primaryText={date} />
              </ListItem>
            </List>
          </Link>
        )
      })
    } else {
      content = <i>No todo lists found...</i>
    }

    return (
      <TodoListPage>
        <Grid>
          <Row>
            <Cell columns={12}>
              <Card id="todo-list" className="card-content">
                <h1>Todo Lists</h1>
                {content}
              </Card>
            </Cell>
          </Row>
        </Grid>
      </TodoListPage>
    )
  }
}

export default TodoLists
