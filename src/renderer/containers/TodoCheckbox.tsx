import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Todo from '../types/Todo'
import { ActionUpdateTodoFormCompleted, NormalizedTodoRes } from '../actions/types'
import { Form, State } from '../reducers/types'
import { readTodo, readTodoFormCompleted } from '../selectors'
import { todoIsChecked } from '../util'
import { updateTodo as acUpdateTodo, updateTodoFormCompleted as acUpdateTodoFormCompleted } from '../actions/todos'

interface DispatchProps {
  updateTodo: (id: Todo['id'], data: Partial<Todo>) => Promise<NormalizedTodoRes>
  updateTodoFormCompleted: (id: Todo['id'], completed_at: Todo['completed_at']) => ActionUpdateTodoFormCompleted
}

interface OwnProps {
  id: number
  completed_at?: string
}

interface StateProps {
  completed: Form['completed']
  reduxTodo: Todo
}

type Props = DispatchProps & StateProps & OwnProps

class TodoCheckbox extends Component<Props> {
  private handleClick = () => {
    const { completed, id, updateTodo, updateTodoFormCompleted } = this.props

    let newCompletedAt
    if (completed) {
      newCompletedAt = null
    } else {
      newCompletedAt = moment()
        .utc()
        .format()
    }

    updateTodoFormCompleted(id, newCompletedAt)
    updateTodo(id, { completed_at: newCompletedAt })
  }

  public render(): JSX.Element {
    const { completed } = this.props
    const icon = completed ? 'check_box' : 'check_box_outline_blank'
    return <MaterialIcon icon={icon} onClick={this.handleClick} className="todo-list-item-checkbox" />
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const id = String(ownProps.id)
  return {
    completed: readTodoFormCompleted(state.todos.ui.formById, id),
    reduxTodo: readTodo(state.todos.api, id)
  }
}

const mapDispatchToProps = {
  updateTodo: acUpdateTodo,
  updateTodoFormCompleted: acUpdateTodoFormCompleted
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCheckbox)
