import Todo from './Todo'

export type getState = () => State

export interface State {
  todos: StateTodos
}

export interface StateById<T> {
  [key: string]: T
}

export interface StateList<T> {
  id: number | string
  items: T[]
}

export interface StateTodos {
  byId: StateById<Todo>
  formNameById: StateById<string>
  list: StateList<number>
}