import React from 'react'

import Todo from '../types/Todo'

const TodoLists = ({ todoLists = [] }: { todoLists: Todo[] }): JSX.Element => {
  if (todoLists.length > 0) {
    todoLists.map(todoList => <div>i am a todolist</div>)
  }
  return <div>No todo lists</div>
}

export default TodoLists
