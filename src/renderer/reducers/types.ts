import Todo from '../types/Todo'

export interface Form {
  name: string
  completed: boolean
}

export type getState = () => State

export interface State {
  todos: StateTodos
}

export interface StateById<T> {
  [key: string]: T
}

export interface StateTodos {
  api: StateTodosAPI
  ui: StateTodosUI
}

export interface StateTodosAPI {
  byId: StateById<Todo>
  lists: StateById<number[]>
}

export interface StateTodosUI {
  formById: StateById<Form>
}
