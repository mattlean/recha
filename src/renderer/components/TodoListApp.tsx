import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Page from './Page'
import TodoList2 from './TodoList2'
import initialData from '../util/initialData'

class TodoListApp extends Component {
  public state = initialData

  private onDragEnd = result => {
    const { todolists } = this.state
    const { destination, draggableId, source } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const todolist = todolists[source.droppableId]
    const newTodoIds = Array.from(todolist.todoIds)
    newTodoIds.splice(source.index, 1)
    newTodoIds.splice(destination.index, 0, draggableId)

    const newTodolist = {
      ...todolist,
      todoIds: newTodoIds
    }

    const newState = {
      ...this.state,
      todolists: {
        ...todolists,
        [newTodolist.date]: newTodolist
      }
    }

    this.setState(newState)
  }

  public render(): JSX.Element {
    const { todos, todolists } = this.state
    const todolist = todolists['2019-02-03']
    const todolistTodos = todolists['2019-02-03'].todoIds.map(todoId => todos[todoId])
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <TodoList2 key={todolist.date} todolist={todolist} todos={todolistTodos} />
      </DragDropContext>
    )
  }
}

export default TodoListApp
