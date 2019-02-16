/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch'

import HTTPErr from '../HTTPErr'
import Todo from '../../types/Todo'
import { APIRes } from '../../types'
import { genReqOptions, ROOT_PATH } from '.'

interface TodosQuery {
  col: 'id' | 'date' | 'order_num'
  date: string
  dir: 'ASC' | 'asc' | 'DESC' | 'desc'
}

const TODOS_PATH = `${ROOT_PATH}/todos`

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

export const getTodoLists = (): Promise<APIRes<string[]>> =>
  fetch(`${TODOS_PATH}/lists`).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patchTodo = (id: number, data: any): Promise<APIRes<Todo>> =>
  fetch(`${TODOS_PATH}/${id}`, genReqOptions('PATCH', data)).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
