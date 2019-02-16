import MaterialIcon from '@material/react-material-icon'
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Todo from '../types/Todo'
import { NormalizedTodoRes } from '../actions/types'
import { updateTodo as acUpdateTodo } from '../actions/todos'

interface DispatchProps {
  updateTodo: (id: Todo['id'], data: Partial<Todo>) => Promise<NormalizedTodoRes>
}

interface OwnProps {
  id: number
  completed_at?: string
}

interface State {
  checked: boolean
}

type Props = DispatchProps & OwnProps

// TODO: load Todo from Redux store & update when new Todo is downloaded

class TodoCheckbox extends Component<Props, State> {
  public constructor(props) {
    super(props)
    const { completed_at } = this.props

    const checked = completed_at ? true : false // eslint-disable-line no-unneeded-ternary

    this.state = { checked }
  }

  private handleClick = () => {
    const { id, updateTodo } = this.props
    const { checked } = this.state

    const data: Partial<Todo> = {}
    if (checked) {
      data.completed_at = null
      updateTodo(id, data)
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

const mapDispatchToProps = {
  updateTodo: acUpdateTodo
}

export default connect(
  null,
  mapDispatchToProps
)(TodoCheckbox)
