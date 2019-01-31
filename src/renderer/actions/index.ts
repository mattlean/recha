import { normalize } from 'normalizr'

import * as api from '../util/mockAPI'
import {
  ActionAddTodoSuccess,
  ActionFetchTodosFailure,
  ActionFetchTodosRequest,
  ActionFetchTodosSuccess,
  ActionToggleTodoSuccess,
  getState,
  NormalizedTodoRes,
  NormalizedTodosRes,
  ThunkDispatch,
  ThunkResult,
  Todo
} from '../types'
import { arrayOfTodos, todo } from '../types/schema'
import { getIsFetching } from '../reducers'

export const addTodoSuccess = (response: Todo): ActionAddTodoSuccess => ({
  type: 'ADD_TODO_SUCCESS',
  response: normalize(response, todo)
})

export const addTodo = (text: string): ThunkResult<Promise<NormalizedTodoRes>> => (dispatch: ThunkDispatch) =>
  api.addTodo(text).then(response => dispatch(addTodoSuccess(response)).response)

export const fetchTodosFailure = (
  filter: string,
  message: string = 'Something went wrong.'
): ActionFetchTodosFailure => ({
  type: 'FETCH_TODOS_FAILURE',
  filter,
  message
})

export const fetchTodosRequest = (filter: string): ActionFetchTodosRequest => ({
  type: 'FETCH_TODOS_REQUEST',
  filter
})

export const fetchTodosSuccess = (filter: string, response: Todo[]): ActionFetchTodosSuccess => ({
  type: 'FETCH_TODOS_SUCCESS',
  filter,
  response: normalize(response, arrayOfTodos)
})

export const fetchTodos = (
  filter: string
): ThunkResult<Promise<ActionFetchTodosFailure | NormalizedTodosRes | void>> => (
  dispatch: ThunkDispatch,
  getState: getState
) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch(fetchTodosRequest(filter))

  return api.fetchTodos(filter).then(
    response => {
      return dispatch(fetchTodosSuccess(filter, response)).response
    },
    error => {
      return dispatch(fetchTodosFailure(filter, error.message))
    }
  )
}

export const toggleTodoSuccess = (response: Todo): ActionToggleTodoSuccess => ({
  type: 'TOGGLE_TODO_SUCCESS',
  response: normalize(response, todo)
})

export const toggleTodo = (id: string): ThunkResult<Promise<NormalizedTodoRes>> => (dispatch: ThunkDispatch) =>
  api.toggleTodo(id).then(response => dispatch(toggleTodoSuccess(response)).response)
