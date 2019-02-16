import Todo from '../types/Todo'

export type getState = () => State

export interface State {
  todos: StateTodos
}

export interface StateById<T> {
  [key: string]: T
}

export interface StateTodos {
  api: StateTodosAPI
  form: StateTodosForm
}

export interface StateTodosAPI {
  byId: StateById<Todo>
  lists: StateById<string[]>
}

export interface StateTodosForm {
  names: StateById<string>
}
