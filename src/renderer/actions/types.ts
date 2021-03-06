import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import Todo from '../types/Todo'
import { State } from '../reducers/types'

export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS'
export const START_TODOS_REQ = 'START_TODOS_REQ'
export const UPDATE_TODO_FORM_COMPLETED = 'UPDATE_TODO_FORM_COMPLETED'
export const UPDATE_TODO_FORM_NAME = 'UPDATE_TODO_FORM_NAME'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'

export type Actions =
  | ActionAddTodoSuccess
  | ActionFetchTodosSuccess
  | ActionRemoveTodoSuccess
  | ActionStartTodosReq
  | ActionUpdateTodoFormCompleted
  | ActionUpdateTodoFormName
  | ActionUpdateTodoSuccess

export interface ActionAddTodoSuccess {
  type: typeof ADD_TODO_SUCCESS
  date: Todo['date']
  res: NormalizedTodoRes
}

export interface ActionFetchTodosSuccess {
  type: typeof FETCH_TODOS_SUCCESS
  date: Todo['date']
  res: NormalizedTodosRes
}

export interface ActionRemoveTodoSuccess {
  type: typeof REMOVE_TODO_SUCCESS
  date: Todo['date']
  id: Todo['id']
}

export interface ActionStartTodosReq {
  type: typeof START_TODOS_REQ
  initiator: Initiator
}

export interface ActionUpdateTodoFormCompleted {
  type: typeof UPDATE_TODO_FORM_COMPLETED
  id: Todo['id']
  completed: boolean
}

export interface ActionUpdateTodoFormName {
  type: typeof UPDATE_TODO_FORM_NAME
  id: Todo['id']
  name: Todo['name']
}

export interface ActionUpdateTodoSuccess {
  type: typeof UPDATE_TODO_SUCCESS
  res: NormalizedTodoRes
}

export type Initiator = 'addTodo' | 'fetchTodos' | 'removeTodo' | 'reorderTodos' | 'updateTodo'

interface NormalizedBaseTodoRes {
  entities: {
    todos: {
      [key: string]: Todo
    }
  }
}

export interface NormalizedTodoRes extends NormalizedBaseTodoRes {
  result: Todo['id']
}

export interface NormalizedTodosRes extends NormalizedBaseTodoRes {
  result: Todo['id'][]
}

export type ThunkDispatch = ReduxThunkDispatch<State, undefined, Actions>

export type ThunkResult<R> = ThunkAction<R, State, undefined, Actions>
