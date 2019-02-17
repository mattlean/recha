import { createSelector } from 'reselect'

import Todo from '../types/Todo'
import { StateTodosAPI, StateTodosUI } from '../reducers/types'

export const readTodo = (state: StateTodosAPI, id: string): Todo => state.byId[id]

export const readTodoFormCompleted = (state: StateTodosUI['formById'], id: string): boolean => {
  if (state[id]) return state[id].completed
  return undefined
}

export const readTodoFormName = (state: StateTodosUI['formById'], id: string): string => {
  if (state[id]) return state[id].name
  return undefined
}

export const readTodoList = (state: StateTodosAPI, date: string): Todo[] => {
  if (state.lists && Array.isArray(state.lists[date])) {
    return state.lists[date].map(id => readTodo(state, String(id)))
  }
  return []
}

export const rsGetTodoList = createSelector(
  readTodoList,
  todoList => todoList
)
