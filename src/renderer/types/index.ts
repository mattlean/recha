import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

export interface ActionAddTodoSuccess {
  type: 'ADD_TODO_SUCCESS',
  response: NormalizedTodoRes
}

export interface ActionFetchTodosFailure {
  type: 'FETCH_TODOS_FAILURE',
  filter: string,
  message: string
}

export interface ActionFetchTodosRequest {
  type: 'FETCH_TODOS_REQUEST',
  filter: string
}

export interface ActionFetchTodosSuccess {
  type: 'FETCH_TODOS_SUCCESS',
  filter: string,
  response: NormalizedTodosRes
}

export type Actions = ActionFetchTodosFailure | ActionAddTodoSuccess | ActionFetchTodosRequest | ActionFetchTodosSuccess | ActionToggleTodoSuccess

export type ActionsResponse = ActionAddTodoSuccess | ActionFetchTodosSuccess | ActionToggleTodoSuccess

export interface ActionToggleTodoSuccess {
  type: 'TOGGLE_TODO_SUCCESS',
  response: NormalizedTodoRes
}

export type getState = () => State

export type NormalizedAllTodoRes = NormalizedTodoRes | NormalizedTodosRes

interface NormalizedBaseTodoRes {
  entities: {
    todos: {
      [key: string]: Todo
    }
  }
}

export interface NormalizedTodoRes extends NormalizedBaseTodoRes {
  result: string
}

export interface NormalizedTodosRes extends NormalizedBaseTodoRes {
  result: string[]
}

export interface State {
  readonly byId: StateById | {},
  readonly listByFilter: StateListByFilter | {}
}

export interface StateById {
  readonly [key: string]: Todo
}

export type StateListErrorMessage = string | null

export interface StateListByFilter {
  readonly all: StateList,
  readonly active: StateList,
  readonly completed: StateList
}

export type StateListIsFetching = boolean

export interface StateList {
  readonly errorMessage: StateListErrorMessage,
  readonly ids: StateListIds,
  readonly isFetching: StateListIsFetching
}

export type StateListIds = string[]

export type ThunkDispatch = ReduxThunkDispatch<State, undefined, Actions>

export type ThunkResult<R> = ThunkAction<R, State, undefined, Actions>

export interface Todo {
  id: string,
  text: string,
  completed: boolean
}
