import Todo from './Todo'

export type getState = () => State

export interface State {
  todos: StateTodos
}

export interface StateById<T> {
  [key: string]: T
}

export interface StateTodos {
  byId: StateById<Todo>
  formNames: StateById<string>
  lists: StateById<string[]>
}
