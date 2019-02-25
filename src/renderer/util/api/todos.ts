/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch'

import HTTPErr from '../HTTPErr'
import Todo from '../../types/Todo'
import { APIRes } from '../../types'
import { genReqOptions } from '.'

interface TodosQuery {
  col: 'id' | 'date' | 'order_num'
  date: string
  dir: 'ASC' | 'asc' | 'DESC' | 'desc'
}

let ROOT_PATH
if (process.env.NODE_ENV === 'test') {
  ROOT_PATH = '/api/v1'
} else {
  // @ts-ignore
  ROOT_PATH = __API__ // eslint-disable-line no-undef
}

const TODOS_PATH = `${ROOT_PATH}/todos`

export const deleteTodo = (id: number): Promise<APIRes<Todo>> =>
  fetch(`${TODOS_PATH}/${id}`, genReqOptions('DELETE')).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })

export const getTodoLists = (): Promise<APIRes<string[]>> =>
  fetch(`${TODOS_PATH}/lists`).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })

export const getTodos = (query?: Partial<TodosQuery>): Promise<APIRes<Todo[]>> => {
  let newPathTodos = TODOS_PATH
  if (query) {
    const queryString = new URLSearchParams(query).toString()
    if (queryString) newPathTodos += `?${queryString}`
  }

  return fetch(newPathTodos).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
}

export const patchTodo = (id: number, data: Partial<Todo>): Promise<APIRes<Todo>> =>
  fetch(`${TODOS_PATH}/${id}`, genReqOptions('PATCH', data)).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })

export const patchTodoOrders = (data: number[]): Promise<APIRes<Todo[]>> =>
  fetch(`${TODOS_PATH}/reorder`, genReqOptions('PATCH', data)).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })

export const postTodo = (data: Partial<Todo>): Promise<APIRes<Todo>> =>
  fetch(`${TODOS_PATH}`, genReqOptions('POST', data)).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
