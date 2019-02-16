import { createSelector } from 'reselect'

import Todo from '../types/Todo'
import { StateTodosAPI, StateTodosForm } from '../reducers/types'

export const getFormTodoName = (state: StateTodosForm['names'], id: string): string => state[id]

export const getTodo = (state: StateTodosAPI, id: string): Todo => state.byId[id]

export const getTodoList = (state: StateTodosAPI, date: string): Todo[] => {
  if (state.lists && Array.isArray(state.lists[date])) {
    return state.lists[date].map(id => getTodo(state, String(id)))
  }
  return []
}

export const rsGetTodoList = createSelector(
  getTodoList,
  todoList => todoList
)
