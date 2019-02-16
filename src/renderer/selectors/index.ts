import { createSelector } from 'reselect'

import Todo from '../types/Todo'
import { StateTodosAPI, StateTodosForm } from '../reducers/types'

export const readFormTodoName = (state: StateTodosForm['names'], id: string): string => state[id]

export const readTodo = (state: StateTodosAPI, id: string): Todo => state.byId[id]

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
