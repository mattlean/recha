import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import Todo from './Todo'
import { State } from './reducers'

export const FETCH_TODOS_REQ = 'FETCH_TODOS_REQUEST'
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'

export type Actions = ActionFetchTodosFailure | ActionFetchTodosReq | ActionFetchTodosSuccess

export interface ActionFetchTodosFailure {
  type: typeof FETCH_TODOS_FAILURE
  message: string
}

export interface ActionFetchTodosReq {
  type: typeof FETCH_TODOS_REQ
}

export interface ActionFetchTodosSuccess {
  type: typeof FETCH_TODOS_SUCCESS
  date: string
  res: NormalizedTodosRes
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
