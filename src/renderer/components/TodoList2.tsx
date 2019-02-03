import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Todo2 from './Todo2'

interface Todo {
  id: number
  name: string
  date: string
  order: number
}

interface TodoList2Props {
  todolist: {
    date: string
    todoIds: number[]
  }
  todos: Todo[]
}

interface InnerListProps {
  todos: Todo[]
}

class InnerList extends Component<InnerListProps> {
  public shouldComponentUpdate(nextProps): boolean {
    const { todos } = this.props
    if (nextProps.todos === todos) {
      return false
    }
    return true
  }

  public render(): JSX.Element[] {
    const { todos } = this.props

    return todos.map((todo, index) => <Todo2 key={todo.id} todo={todo} index={index} />)
  }
}

// eslint-disable-next-line react/no-multi-comp
class TodoList2 extends Component<TodoList2Props> {
  public render(): JSX.Element {
    const { todolist, todos } = this.props
    const { date } = todolist

    return (
      <div>
        <h1>{date}</h1>
        <Droppable droppableId={todolist.date}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <InnerList todos={todos} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }
}

export default TodoList2
