import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Todo from '../types/Todo'
import { NormalizedTodoRes } from '../actions/types'
import { readTodo } from '../selectors'
import { State } from '../reducers/types'
import { updateTodo as acUpdateTodo } from '../actions/todos'

interface DispatchProps {
  updateTodo: (id: Todo['id'], data: Partial<Todo>) => Promise<NormalizedTodoRes>
}

interface OwnProps {
  id: number
  completed_at?: string
}

interface StateProps {
  reduxTodo: Todo
}

interface ComponentState {
  checked: boolean
}

type Props = DispatchProps & StateProps & OwnProps

class TodoCheckbox extends Component<Props, ComponentState> {
  public constructor(props) {
    super(props)
    const { completed_at } = this.props

    const checked = this.isChecked(completed_at) // eslint-disable-line no-unneeded-ternary

    this.state = { checked }
  }

  public componentDidUpdate(prevProps): void {
    const { reduxTodo } = this.props
    if (prevProps.reduxTodo !== reduxTodo) {
      this.setState({ checked: this.isChecked(reduxTodo.completed_at) }) // eslint-disable-line react/no-did-update-set-state
    }
  }

  private isChecked = (completed_at: string) => {
    if (completed_at) return true
    return false
  }

  private handleClick = () => {
    const { id, updateTodo } = this.props
    const { checked } = this.state

    const data: Partial<Todo> = {}
    if (checked) {
      data.completed_at = null
    } else {
      data.completed_at = moment()
        .utc()
        .format()
    }
    updateTodo(id, data)
    this.setState({ checked: !checked })
  }

  public render(): JSX.Element {
    const { checked } = this.state
    const icon = checked ? 'check_box' : 'check_box_outline_blank'
    return <MaterialIcon icon={icon} onClick={this.handleClick} className="todo-list-item-checkbox" />
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => {
  const id = String(ownProps.id)
  return {
    reduxTodo: readTodo(state.todos.api, id)
  }
}

const mapDispatchToProps = {
  updateTodo: acUpdateTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCheckbox)
