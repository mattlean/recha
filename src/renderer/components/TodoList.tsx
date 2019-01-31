import React from 'react'

import Todo from './Todo'
import { Todo as TodoType } from '../types'

const TodoList = ({ onTodoClick, todos }: { onTodoClick?: (...args: any[]) => any, todos: TodoType[] }): JSX.Element => (
  <ul>
    {todos.map(todo => {
      const props = {
        ...todo,
        onClick: undefined
      }

      if(onTodoClick) {
        props.onClick = () => onTodoClick(todo.id)
      }

      return <Todo key={todo.id} {...props} />
    })}
  </ul>
)

export default TodoList
