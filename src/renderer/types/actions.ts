import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import Todo from './Todo'
import { State } from './reducers'

export const FETCH_TODOS_REQ = 'FETCH_TODOS_REQUEST'
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const SELECT_TODO = 'SELECT_TODO'
export const SELECT_TODO_LIST = 'SELECT_TODO_LIST'
export const UPDATE_TODO_NAME = 'UPDATE_TODO_NAME'

export type Actions =
  | ActionFetchTodosFailure
  | ActionFetchTodosReq
  | ActionFetchTodosSuccess
  | ActionSelectTodo
  | ActionSelectTodoList
  | ActionUpdateTodoName

export interface ActionFetchTodosFailure {
  type: typeof FETCH_TODOS_FAILURE
  message: string
}

export interface ActionFetchTodosReq {
  type: typeof FETCH_TODOS_REQ
}

export interface ActionFetchTodosSuccess {
  type: typeof FETCH_TODOS_SUCCESS
  date: Todo['date']
  res: NormalizedTodosRes
}

export interface ActionSelectTodo {
  type: typeof SELECT_TODO
  todo: Todo
}

export interface ActionSelectTodoList {
  type: typeof SELECT_TODO_LIST
  date: Todo['date']
}

export interface ActionUpdateTodoName {
  type: typeof UPDATE_TODO_NAME
  name: Todo['name']
}

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
