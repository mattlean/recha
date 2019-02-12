import { normalize } from 'normalizr'

import Todo from '../types/Todo'
import { APIRes } from '../types/index2'
import { arrayOfTodos } from './schema'
import { getTodos } from '../util/api'
import {
  ActionFetchTodosFailure,
  ActionFetchTodosReq,
  ActionFetchTodosSuccess,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_REQ,
  FETCH_TODOS_SUCCESS,
  NormalizedTodosRes,
  ThunkDispatch,
  ThunkResult
} from '../types/actions'
import { State } from '../types/reducers'

export const fetchTodosFailure = (message: string = 'Something went wrong.'): ActionFetchTodosFailure => ({
  type: FETCH_TODOS_FAILURE,
  message
})

export const fetchTodosReq = (): ActionFetchTodosReq => ({
  type: FETCH_TODOS_REQ
})

export const fetchTodosSuccess = (date: string, res: APIRes<Todo[]>): ActionFetchTodosSuccess => {
  return {
    type: FETCH_TODOS_SUCCESS,
    date,
    res: normalize(res.data, arrayOfTodos)
  }
}

export const fetchTodos = (date: string): ThunkResult<Promise<ActionFetchTodosFailure | NormalizedTodosRes>> => (
  dispatch: ThunkDispatch,
  getState: () => State
) => {
  // if (getIsFetching(getState(), filter)) {
  //   return Promise.resolve()
  // }

  dispatch(fetchTodosReq())

  return getTodos({ date, col: 'order_num', dir: 'ASC' }).then(
    res => Promise.resolve(dispatch(fetchTodosSuccess(date, res)).res),
    err => Promise.resolve(dispatch(fetchTodosFailure(err.message)))
  )
}
