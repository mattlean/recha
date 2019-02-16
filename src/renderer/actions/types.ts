import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import Todo from '../types/Todo'
import { State } from '../reducers/types'

export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const SELECT_TODO = 'SELECT_TODO'
export const SELECT_TODO_LIST = 'SELECT_TODO_LIST'
export const START_TODOS_REQ = 'START_TODOS_REQ'
export const UPDATE_FORM_TODO_NAME = 'UPDATE_FORM_TODO_NAME'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'

export type Actions =
  | ActionFetchTodosSuccess
  | ActionSelectTodo
  | ActionSelectTodoList
  | ActionStartTodosReq
  | ActionUpdateFormTodoName
  | ActionUpdateTodoSuccess

export interface ActionFetchTodosSuccess {
  type: typeof FETCH_TODOS_SUCCESS
  date: Todo['date']
  res: NormalizedTodosRes
}

export interface ActionSelectTodo {
  type: typeof SELECT_TODO
  id: Todo['id']
  name: Todo['name']
}

export interface ActionSelectTodoList {
  type: typeof SELECT_TODO_LIST
  date: Todo['date']
}

export interface ActionStartTodosReq {
  type: typeof START_TODOS_REQ
  initiator: Initiator
}

export interface ActionUpdateFormTodoName {
  type: typeof UPDATE_FORM_TODO_NAME
  id: Todo['id']
  name: Todo['name']
}

export interface ActionUpdateTodoSuccess {
  type: typeof UPDATE_TODO_SUCCESS
  res: NormalizedTodoRes
}

export type Initiator = 'fetchTodo' | 'updateTodo'

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
