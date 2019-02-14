/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch'

import HTTPErr from './HTTPErr'
import Todo from '../types/Todo'
import { APIRes } from '../types'

interface TodosQuery {
  col: 'id' | 'date' | 'order_num'
  date: string
  dir: 'ASC' | 'asc' | 'DESC' | 'desc'
}

const rootPath = '/api/v1'

const pathTodos = `${rootPath}/todos`

export const getTodos = (query?: Partial<TodosQuery>): Promise<APIRes<Todo[]>> => {
  let newPathTodos = pathTodos
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
  fetch(`${pathTodos}/lists`).then(res => {
    if (!res.ok) throw new HTTPErr(res.statusText, res.status, res)
    return res.json()
  })
